package graph

import (
	"context"
	"encoding/json"
	"math/rand"
	"strconv"

	"card_game/backend/graph/model"

	"github.com/go-redis/redis/v8"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require
// here.

var (
	rdb       *redis.Client
	broadcast = make(chan model.Game)
)

type Resolver struct{}

func createDeck() []*model.Card {
	suits := []string{"Hearts", "Diamonds", "Clubs", "Spades"}
	ranks := []string{"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"}
	var deck []*model.Card
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
			deck = append(deck, &model.Card{Suit: suit, Rank: rank, Value: value})
		}
	}
	rand.Shuffle(len(deck), func(i, j int) { deck[i], deck[j] = deck[j], deck[i] })
	return deck
}

func calculateScore(hand []*model.Card) int {
	score := 0
	aces := 0
	for _, card := range hand {
		if card != nil && card.Rank == "A" {
			aces++
			score += 11
		} else if card != nil {
			score += card.Value
		}
	}
	for score > 21 && aces > 0 {
		score -= 10
		aces--
	}
	return score
}

func saveGame(game model.Game) error {
	data, err := json.Marshal(game)
	if err != nil {
		return err
	}
	return rdb.Set(context.Background(), "game:"+*game.ID, data, 0).Err()
}

func loadGame(id string) (model.Game, error) {
	data, err := rdb.Get(context.Background(), "game:"+id).Result()
	if err != nil {
		return model.Game{}, err
	}
	var game model.Game
	err = json.Unmarshal([]byte(data), &game)
	return game, err
}

func broadcastGame(game model.Game) {
	select {
	case broadcast <- game:
	default:
	}
}
