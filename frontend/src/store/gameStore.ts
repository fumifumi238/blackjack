import { create } from "zustand";

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import {
  StartGameMutation,
  StartGameDocument,
  HitMutation,
  HitDocument,
  StandMutation,
  StandDocument,
  FetchGameQuery,
  FetchGameDocument,
} from "@/gql/operations.generated";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

//  SSR対策：ブラウザでのみ wsLink を作る
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:8080/graphql",
        })
      )
    : null;

//  wsLink がある時だけ split
const link =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export interface Card {
  suit: string;
  rank: string;
  value: number;
}

export interface Game {
  id?: string | null;
  playerHand: Card[];
  dealerHand: Card[];
  status?: string | null;
  playerScore?: number | null;
  dealerScore?: number | null;
}

interface GameState {
  game: Game | null;
  loading: boolean;
  error: string | null;
  startGame: () => Promise<void>;
  hit: () => Promise<void>;
  stand: () => Promise<void>;
  fetchGame: (id: string) => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  game: null,
  loading: false,
  error: null,
  startGame: async () => {
    set({ loading: true, error: null });
    try {
      const result = await client.mutate<StartGameMutation>({
        mutation: StartGameDocument,
      });
      set({
        game: result.data?.startGame
          ? {
              id: result.data.startGame.id,
              status: result.data.startGame.status,
              playerScore: result.data.startGame.playerScore,
              dealerScore: result.data.startGame.dealerScore,
              playerHand: result.data.startGame.playerHand,
              dealerHand: result.data.startGame.dealerHand,
            }
          : null,
        loading: false,
      });
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
      set({
        game: result.data?.hit
          ? {
              id: result.data.hit.id,
              status: result.data.hit.status,
              playerScore: result.data.hit.playerScore,
              dealerScore: result.data.hit.dealerScore,
              playerHand: result.data.hit.playerHand,
              dealerHand: result.data.hit.dealerHand,
            }
          : null,
        loading: false,
      });
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
      set({
        game: result.data?.stand
          ? {
              id: result.data.stand.id,
              status: result.data.stand.status,
              playerScore: result.data.stand.playerScore,
              dealerScore: result.data.stand.dealerScore,
              playerHand: result.data.stand.playerHand,
              dealerHand: result.data.stand.dealerHand,
            }
          : null,
        loading: false,
      });
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
      set({
        game: result.data?.gameState
          ? {
              id: result.data.gameState.id,
              status: result.data.gameState.status,
              playerScore: result.data.gameState.playerScore,
              dealerScore: result.data.gameState.dealerScore,
              playerHand: result.data.gameState.playerHand,
              dealerHand: result.data.gameState.dealerHand,
            }
          : null,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
