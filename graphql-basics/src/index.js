import { GraphQLServer } from "graphql-yoga";

// const typeDefs = `
//   type Query{
//       hello:String!
//       name:String!
//       location:String!
//       bio:String!
//   }
// `;

const typeDefs = `
type Query{
    id:ID!
    title:String!
    releaseYear:Int
    rating:Float
    inStock:Boolean!

}
`;

const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    title() {
      return "Siddhant";
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 1.1;
    },
    inStock() {
      return true;
    }
  }
};
// const resolvers = {
//   Query: {
//     hello() {
//       return "This is my first query";
//     },
//     name() {
//       return "Siddhant ";
//     },
//     location() {
//       return "New Delhi";
//     },
//     bio() {
//       return "Aspiring GQL Programmer";
//     }
//   }
// };
const options = {
  port: 8000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(options, ({ port }) =>
  console.log("Server is running on port " + port)
);
