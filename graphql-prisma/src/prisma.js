import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466"
});

//prima.query
//prisma.mutation
//prisma.subscription
//prisma.exists

// prisma.query.users(null, "{id name posts { id title}}").then(data => {
//   console.log(JSON.stringify(data, undefined, 4));
// });

// prisma.query
//   .comments(null, "{id text author {id name}}")
//   .then(data => console.log(JSON.stringify(data, undefined, 4)));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "My new gql is livelol",
//         body: "YOu can find the new one here",
//         published: true,
//         author: {
//           connect: {
//             id: "cjnqchvxl00380805jy99p37y"
//           }
//         }
//       }
//     },
//     "{id title body published author {id name}}"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 4));
//     return prisma.query.users(null, "{id name posts { id title}}");
//   })
//   .then(data => console.log(JSON.stringify(data, undefined, 4)));

// prisma.mutation
//   .updatePost({
//     where: { id: "cjnsu5ep6004q0805bn1tesz1" },
//     data: { published: false }
//   })
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, "{id name posts { id title published }}");
//   })
//   .then(data => console.log(JSON.stringify(data, undefined, 4)));

//Create a new Post

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    "{id}"
  );
  return await prisma.query.user(
    {
      where: {
        id: authorId
      }
    },
    "{id name posts {id title published} }"
  );
};

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data: { ...data }
    },
    "{ author {id} }"
  );
  return await prisma.query.user(
    {
      where: {
        id: post.author.id
      }
    },
    "{ id name email posts { id title published}}"
  );
};

updatePostForUser("cjnqc7tc5002k0805dot6q3j1", { published: false }).then(
  user => console.log(JSON.stringify(user, undefined, 4))
);
// createPostForUser("cjnqbsrb9001n0805k8wn5tpu", {
//   title: "Great Books to Readgg",
//   body: "NICE ONES",
//   published: true
// }).then(user => console.log(JSON.stringify(user, undefined, 4)));
