/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation StartGame {\n    startGame {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": typeof types.StartGameDocument,
    "\n  mutation Hit($id: ID!) {\n    hit(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": typeof types.HitDocument,
    "\n  mutation Stand($id: ID!) {\n    stand(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": typeof types.StandDocument,
    "\n  query FetchGame($id: ID!) {\n    gameState(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": typeof types.FetchGameDocument,
};
const documents: Documents = {
    "\n  mutation StartGame {\n    startGame {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": types.StartGameDocument,
    "\n  mutation Hit($id: ID!) {\n    hit(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": types.HitDocument,
    "\n  mutation Stand($id: ID!) {\n    stand(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": types.StandDocument,
    "\n  query FetchGame($id: ID!) {\n    gameState(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n": types.FetchGameDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation StartGame {\n    startGame {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"): (typeof documents)["\n  mutation StartGame {\n    startGame {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Hit($id: ID!) {\n    hit(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"): (typeof documents)["\n  mutation Hit($id: ID!) {\n    hit(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Stand($id: ID!) {\n    stand(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"): (typeof documents)["\n  mutation Stand($id: ID!) {\n    stand(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchGame($id: ID!) {\n    gameState(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"): (typeof documents)["\n  query FetchGame($id: ID!) {\n    gameState(id: $id) {\n      id\n      playerHand {\n        suit\n        rank\n        value\n      }\n      dealerHand {\n        suit\n        rank\n        value\n      }\n      status\n      playerScore\n      dealerScore\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;