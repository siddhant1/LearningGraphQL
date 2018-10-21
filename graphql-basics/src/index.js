import { GraphQLServer } from "graphql-yoga";

//! ************************************************SCALAR QUERIES******************************
// const typeDefs = `
//   type Query{
//       hello:String!
//       name:String!
//       location:String!
//       bio:String!
//   }
// `;

// const typeDefs = `
// type Query{
//     id:ID!
//     title:String!
//     releaseYear:Int
//     rating:Float
//     inStock:Boolean!

// }
// `;

// Custom Type Def
//! *************************USer Defined Custome TypeDef QUERIES******************************
const typeDefs = `


type Query{
    me:User!
}

type User{
    id:ID!
    name:String!
    email:String!
    age:Int
}
`;

//! **********************SCALAR QUERIES Resolver******************************
const resolvers = {
  //   Query: {
  //     id() {
  //       return "abc123";
  //     },
  //     title() {
  //       return "Siddhant";
  //     },
  //     releaseYear() {
  //       return null;
  //     },
  //     rating() {
  //       return 1.1;
  //     },
  //     inStock() {
  //       return true;
  //     }
  //   }

  Query: {
    me() {
      return {
        id: "abc123",
        name: "Siddhant",
        email: "siddhant.manchanda@gmail.com"
      };
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
