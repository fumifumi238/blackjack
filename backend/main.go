package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

type Card struct {
	Suit  string `json:"suit"` // ♥,♠,
	Rank  string `json:"rank"`
	Value int    `json:"value"`
}

type Game struct {
	ID          string `json:"id"`
	PlayerHand  []Card `json:"playerHand"`
	DealerHand  []Card `json:"dealerHand"`
	Status      string `json:"status"`
	PlayerScore int    `json:"playerScore"`
	DealerScore int    `json:"dealerScore"`
	Deck        []Card `json:"deck"`
}

var (
	rdb       *redis.Client
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan Game)
	upgrader  = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func init() {
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "localhost:6379"
	}
	rdb = redis.NewClient(&redis.Options{
		Addr: redisURL,
	})
}

func createDeck() []Card {
	suits := []string{"Hearts", "Diamonds", "Clubs", "Spades"}
	ranks := []string{"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"}
	var deck []Card
	for _, suit := range suits {
		for _, rank := range ranks {
			value := 0
			switch rank {
			case "A":
				value = 11
			case "J", "Q", "K":
				value = 10
			default:
				value, _ = strconv.Atoi(rank)
			}
			deck = append(deck, Card{Suit: suit, Rank: rank, Value: value})
		}
	}
	rand.Shuffle(len(deck), func(i, j int) { deck[i], deck[j] = deck[j], deck[i] })
	return deck
}

func calculateScore(hand []Card) int {
	score := 0
	aces := 0
	for _, card := range hand {
		if card.Rank == "A" {
			aces++
			score += 11
		} else {
			score += card.Value
		}
	}
	for score > 21 && aces > 0 {
		score -= 10
		aces--
	}
	return score
}

func saveGame(game Game) error {
	data, err := json.Marshal(game)
	if err != nil {
		return err
	}
	return rdb.Set(context.Background(), "game:"+game.ID, data, 0).Err()
}

func loadGame(id string) (Game, error) {
	data, err := rdb.Get(context.Background(), "game:"+id).Result()
	if err != nil {
		return Game{}, err
	}
	var game Game
	err = json.Unmarshal([]byte(data), &game)
	return game, err
}

func handleWebSocket(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer ws.Close()
	clients[ws] = true
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			delete(clients, ws)
			break
		}
	}
}

func broadcastGame(game Game) {
	select {
	case broadcast <- game:
	default:
	}
}

func main() {
	go func() {
		for {
			game := <-broadcast
			for client := range clients {
				err := client.WriteJSON(game)
				if err != nil {
					client.Close()
					delete(clients, client)
				}
			}
		}
	}()

	// GraphQL Schema
	cardType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Card",
		Fields: graphql.Fields{
			"suit": &graphql.Field{
				Type: graphql.String,
			},
			"rank": &graphql.Field{
				Type: graphql.String,
			},
			"value": &graphql.Field{
				Type: graphql.Int,
			},
		},
	})

	gameType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Game",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.ID,
			},
			"playerHand": &graphql.Field{
				Type: graphql.NewList(cardType),
			},
			"dealerHand": &graphql.Field{
				Type: graphql.NewList(cardType),
			},
			"status": &graphql.Field{
				Type: graphql.String,
			},
			"playerScore": &graphql.Field{
				Type: graphql.Int,
			},
			"dealerScore": &graphql.Field{
				Type: graphql.Int,
			},
		},
	})

	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"gameState": &graphql.Field{
				Type: gameType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					id := p.Args["id"].(string)
					game, err := loadGame(id)
					if err != nil {
						return nil, err
					}
					game.PlayerScore = calculateScore(game.PlayerHand)
					game.DealerScore = calculateScore(game.DealerHand)
					return game, nil
				},
			},
		},
	})

	mutationType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"startGame": &graphql.Field{
				Type: gameType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					id := fmt.Sprintf("%d", rand.Int63())
					deck := createDeck()
					playerHand := []Card{deck[0], deck[1]}
					dealerHand := []Card{deck[2], deck[3]}
					deck = deck[4:]
					game := Game{
						ID:         id,
						PlayerHand: playerHand,
						DealerHand: dealerHand,
						Status:     "playing",
						Deck:       deck,
					}
					err := saveGame(game)
					if err != nil {
						return nil, err
					}
					broadcastGame(game)
					game.PlayerScore = calculateScore(game.PlayerHand)
					game.DealerScore = calculateScore(game.DealerHand)
					return game, nil
				},
			},
			"hit": &graphql.Field{
				Type: gameType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					id := p.Args["id"].(string)
					game, err := loadGame(id)
					if err != nil {
						return nil, err
					}
					if game.Status != "playing" {
						return game, nil
					}
					if len(game.Deck) == 0 {
						return nil, fmt.Errorf("no cards left")
					}
					game.PlayerHand = append(game.PlayerHand, game.Deck[0])
					game.Deck = game.Deck[1:]
					score := calculateScore(game.PlayerHand)
					if score > 21 {
						game.Status = "bust"
					}
					err = saveGame(game)
					if err != nil {
						return nil, err
					}
					broadcastGame(game)
					game.PlayerScore = score
					game.DealerScore = calculateScore(game.DealerHand)
					return game, nil
				},
			},
			"stand": &graphql.Field{
				Type: gameType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.ID),
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					id := p.Args["id"].(string)
					game, err := loadGame(id)
					if err != nil {
						return nil, err
					}
					if game.Status != "playing" {
						return game, nil
					}
					// Dealer plays
					for calculateScore(game.DealerHand) < 17 && len(game.Deck) > 0 {
						game.DealerHand = append(game.DealerHand, game.Deck[0])
						game.Deck = game.Deck[1:]
					}
					playerScore := calculateScore(game.PlayerHand)
					dealerScore := calculateScore(game.DealerHand)
					switch {
					case dealerScore > 21:
						game.Status = "player_win"
					case playerScore > dealerScore:
						game.Status = "player_win"
					case playerScore < dealerScore:
						game.Status = "dealer_win"
					default:
						game.Status = "draw"
					}
					err = saveGame(game)
					if err != nil {
						return nil, err
					}
					broadcastGame(game)
					game.PlayerScore = playerScore
					game.DealerScore = dealerScore
					return game, nil
				},
			},
		},
	})

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    queryType,
		Mutation: mutationType,
	})
	if err != nil {
		log.Fatal(err)
	}

	// Gin router
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/graphql", func(c *gin.Context) {
		h := handler.New(&handler.Config{
			Schema:   &schema,
			Pretty:   true,
			GraphiQL: true,
		})
		h.ServeHTTP(c.Writer, c.Request)
	})
	r.GET("/ws", handleWebSocket)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
