import { GraphQLServer, PubSub } from "graphql-yoga";
import prisma from "./prisma";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import Subscription from "./resolvers/Subscription";
import db from "./db";

//PubSub :- constructor to create new PubSub
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    };
  }
});
server.start(({ port }) => console.log("Server is running on port " + port));
