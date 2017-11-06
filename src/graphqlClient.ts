import ApolloClient, { createNetworkInterface } from "apollo-client";
import { Platform } from "react-native";

export const GRAPHQL_URI =
  Platform.OS === "ios"
    ? "https://shop.serga.name/graphql"
    : "http://shop.serga.name/graphql";
// export const GRAPHQL_URI = 'http://192.168.31.20:8000/graphql';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_URI })
});

export default client;
