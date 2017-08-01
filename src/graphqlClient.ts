import ApolloClient, { createNetworkInterface } from "apollo-client";
import { Platform } from "react-native";

// const protocol = Platform.OS === "ios" ? "https" : "http";
export const GRAPHQL_URI = `https://shop.serga.name/graphql`;

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_URI })
});

export default client;
