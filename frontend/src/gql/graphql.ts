/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  rank?: Maybe<Scalars['String']['output']>;
  suit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

export type Game = {
  __typename?: 'Game';
  dealerHand?: Maybe<Array<Maybe<Card>>>;
  dealerScore?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  playerHand?: Maybe<Array<Maybe<Card>>>;
  playerScore?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  hit?: Maybe<Game>;
  stand?: Maybe<Game>;
  startGame?: Maybe<Game>;
};


export type MutationHitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStandArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  gameState?: Maybe<Game>;
};


export type QueryGameStateArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  gameUpdated?: Maybe<Game>;
};

export type StartGameMutationVariables = Exact<{ [key: string]: never; }>;


export type StartGameMutation = { __typename?: 'Mutation', startGame?: { __typename?: 'Game', id?: string | null, status?: string | null, playerScore?: number | null, dealerScore?: number | null, playerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null, dealerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null } | null };

export type HitMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HitMutation = { __typename?: 'Mutation', hit?: { __typename?: 'Game', id?: string | null, status?: string | null, playerScore?: number | null, dealerScore?: number | null, playerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null, dealerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null } | null };

export type StandMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StandMutation = { __typename?: 'Mutation', stand?: { __typename?: 'Game', id?: string | null, status?: string | null, playerScore?: number | null, dealerScore?: number | null, playerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null, dealerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null } | null };

export type FetchGameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FetchGameQuery = { __typename?: 'Query', gameState?: { __typename?: 'Game', id?: string | null, status?: string | null, playerScore?: number | null, dealerScore?: number | null, playerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null, dealerHand?: Array<{ __typename?: 'Card', suit?: string | null, rank?: string | null, value?: number | null } | null> | null } | null };


export const StartGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dealerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"playerScore"}},{"kind":"Field","name":{"kind":"Name","value":"dealerScore"}}]}}]}}]} as unknown as DocumentNode<StartGameMutation, StartGameMutationVariables>;
export const HitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Hit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dealerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"playerScore"}},{"kind":"Field","name":{"kind":"Name","value":"dealerScore"}}]}}]}}]} as unknown as DocumentNode<HitMutation, HitMutationVariables>;
export const StandDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Stand"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stand"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dealerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"playerScore"}},{"kind":"Field","name":{"kind":"Name","value":"dealerScore"}}]}}]}}]} as unknown as DocumentNode<StandMutation, StandMutationVariables>;
export const FetchGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dealerHand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suit"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"playerScore"}},{"kind":"Field","name":{"kind":"Name","value":"dealerScore"}}]}}]}}]} as unknown as DocumentNode<FetchGameQuery, FetchGameQueryVariables>;