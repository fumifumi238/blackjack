import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../backend/schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "src/": {
      preset: "near-operation-file",
      plugins: ["typescript-operations", "typescript", "typed-document-node"],
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "~@/gql/graphql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
