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

//DEMO POSTS
const posts = [
  {
    id: "123",
    title: "GAG",
    body: "GAG"
  },
  {
    id: "123",
    title: "Hey",
    body: "hey"
  }
];

// Custom Type Def
//! *************************USer Defined Custome TypeDef QUERIES******************************
const typeDefs = `
type Query{
    post(query:String):[Post!]!
    greeting(name: String):String!
    add(a: Float!,b: Float!):Float!
    add1(arr:[Float!]!):Float!
    grades:[Int!]!
}

type Post{
    id:ID!
    title:String
    body:String!
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
    // me() {
    //   return {
    //     id: "abc123",
    //     name: "Siddhant",
    //     email: "siddhant.manchanda@gmail.com"
    //   };
    // },
    post(parent, args, ctx, info) {
      const { query = "" } = args;
      let newposts = posts.filter(e => e.title.includes(query));
      return newposts;
    },
    greeting(parent, args, ctx, info) {
      return `Hello ${args.name || ""}`;
    },
    add(parent, args, ctx, info) {
      const { a, b } = args;
      return a + b;
    },
    grades(parent, args, ctx, info) {
      return [90, 99, 70, 88];
    },
    add1(parent, args, ctx, info) {
      const { arr } = args;
      let result = 0;
      arr.forEach(element => {
        result += element;
      });
      return result;
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
