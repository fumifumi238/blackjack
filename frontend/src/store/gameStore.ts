import { create } from "zustand";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import {
  StartGameDocument,
  HitDocument,
  StandDocument,
  FetchGameDocument,
  StartGameMutation,
  HitMutation,
  StandMutation,
  FetchGameQuery,
} from "../gql/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache(),
});

export interface Card {
  suit?: string | null;
  rank?: string | null;
  value?: number | null;
}

export interface Game {
  id?: string | null;
  playerHand?: (Card | null)[] | null;
  dealerHand?: (Card | null)[] | null;
  status?: string | null;
  playerScore?: number | null;
  dealerScore?: number | null;
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

export const useGameStore = create<GameState>((set, get) => ({
  game: null,
  loading: false,
  error: null,
  ws: null as WebSocket | null,
  startGame: async () => {
    set({ loading: true, error: null });
    try {
      const result = await client.mutate<StartGameMutation>({
        mutation: StartGameDocument,
      });
      set({ game: result.data?.startGame || null, loading: false });

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
    if (!game?.id) return;
    set({ loading: true, error: null });
    try {
      const result = await client.mutate<HitMutation>({
        mutation: HitDocument,
        variables: { id: game.id },
      });
      set({ game: result.data?.hit || null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  stand: async () => {
    const { game } = get();
    if (!game?.id) return;
    set({ loading: true, error: null });
    try {
      const result = await client.mutate<StandMutation>({
        mutation: StandDocument,
        variables: { id: game.id },
      });
      set({ game: result.data?.stand || null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchGame: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const result = await client.query<FetchGameQuery>({
        query: FetchGameDocument,
        variables: { id },
      });
      set({ game: result.data?.gameState || null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
