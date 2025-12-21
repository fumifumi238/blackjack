import { create } from "zustand";

import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:8080/graphql");

export interface Card {
  suit: string;
  rank: string;
  value: number;
}

export interface Game {
  id: string;
  playerHand: Card[];
  dealerHand: Card[];
  status: string;
  playerScore: number;
  dealerScore: number;
}

interface GameState {
  game: Game | null;
  loading: boolean;
  error: string | null;
  ws: WebSocket | null;
  startGame: () => Promise<void>;
  hit: () => Promise<void>;
  stand: () => Promise<void>;
  fetchGame: (id: string) => Promise<void>;
}

const START_GAME = gql`
  mutation StartGame {
    startGame {
      id
      playerHand {
        suit
        rank
        value
      }
      dealerHand {
        suit
        rank
        value
      }
      status
      playerScore
      dealerScore
    }
  }
`;

const HIT = gql`
  mutation Hit($id: ID!) {
    hit(id: $id) {
      id
      playerHand {
        suit
        rank
        value
      }
      dealerHand {
        suit
        rank
        value
      }
      status
      playerScore
      dealerScore
    }
  }
`;

const STAND = gql`
  mutation Stand($id: ID!) {
    stand(id: $id) {
      id
      playerHand {
        suit
        rank
        value
      }
      dealerHand {
        suit
        rank
        value
      }
      status
      playerScore
      dealerScore
    }
  }
`;

const FETCH_GAME = gql`
  query FetchGame($id: ID!) {
    gameState(id: $id) {
      id
      playerHand {
        suit
        rank
        value
      }
      dealerHand {
        suit
        rank
        value
      }
      status
      playerScore
      dealerScore
    }
  }
`;

export const useGameStore = create<GameState>((set, get) => ({
  game: null,
  loading: false,
  error: null,
  ws: null as WebSocket | null,
  startGame: async () => {
    set({ loading: true, error: null });
    try {
      const data = await client.request(START_GAME);
      set({ game: data.startGame, loading: false });

      // Connect WebSocket
      const ws = new WebSocket("ws://localhost:8080/ws");
      ws.onmessage = (event) => {
        const game = JSON.parse(event.data);
        set({ game });
      };
      set({ ws });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  hit: async () => {
    const { game } = get();
    if (!game) return;
    set({ loading: true, error: null });
    try {
      const data = await client.request(HIT, { id: game.id });
      set({ game: data.hit, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  stand: async () => {
    const { game } = get();
    if (!game) return;
    set({ loading: true, error: null });
    try {
      const data = await client.request(STAND, { id: game.id });
      set({ game: data.stand, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchGame: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await client.request(FETCH_GAME, { id });
      set({ game: data.gameState, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
