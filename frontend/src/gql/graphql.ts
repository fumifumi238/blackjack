/* eslint-disable */
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
  rank: Scalars['String']['output'];
  suit: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type Game = {
  __typename?: 'Game';
  dealerHand: Array<Card>;
  dealerScore?: Maybe<Scalars['Int']['output']>;
  deck: Array<Card>;
  id?: Maybe<Scalars['ID']['output']>;
  playerHand: Array<Card>;
  playerScore?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
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
