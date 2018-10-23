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
    body: "GAG",
    author: "1"
  },
  {
    id: "1234",
    title: "GAGA",
    body: "GAGA",
    author: "1"
  },
  {
    id: "1235",
    title: "Hey",
    body: "hey",
    author: "2"
  }
];
const users = [
  {
    id: "1",
    name: "Siddhant",
    age: 12
  },
  {
    id: "2",
    name: "Alok",
    age: 11
  }
];
const comments = [
  {
    id: "1",
    text: "Hey i am Siddhant , this is a test comment",
    author: "1",
    post: "123"
  },
  {
    id: "2",
    text: "hey i am another siddhant and this is also a test comment",
    author: "1",
    post: "1234"
  },
  {
    id: "3",
    text: "This worked for me thanks",
    author: "2",
    post: "123"
  }
];

// Custom Type Def
//! *************************USer Defined Custome TypeDef QUERIES******************************
const typeDefs = `
type Query{
    post(query:String):[Post!]!
    user:[User!]!
    greeting(name: String):String!
    add(a: Float!,b: Float!):Float!
    add1(arr:[Float!]!):Float!
    grades:[Int!]!
    comment:[Comment!]!
}
type User {
  id:ID!,
  name:String!
  age:Int
  posts:[Post!]!
  comments:[Comment!]!
}
type Post{
    id:ID!
    title:String
    body:String!
    author:User!
    comments:[Comment!]!
}
type Comment{
  id:ID!
  text:String!
  author:User!
  post:Post!
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
    user(parent, args, ctx, info) {
      return users;
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
    },
    comment(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, info, ctx, inf) {
      // in this case parent is the individual Post on which the query is running
      const { author } = parent;
      return users.find(user => {
        return user.id === author;
      });
    },
    comments(parent, info, ctx, inf) {
      const { id } = parent;
      return comments.filter(comment => comment.post == id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      const { id } = parent;
      return posts.filter(post => {
        return post.author === id;
      });
    },
    comments(parent, args, ctx, info) {
      const { id } = parent;
      return comments.filter(comment => comment.author == id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      const { author } = parent;
      return users.find(user => user.id == author);
    },
    post(parent, args, ctx, info) {
      const { post } = parent;
      return posts.find(pst => pst.id == post);
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
