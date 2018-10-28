import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466"
});
export default prisma;
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
  const UserExists = await prisma.exists.User({ id: authorId });
  if (!UserExists) {
    throw new Error("NO user found");
  }
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
    "{author {id name posts {id title published} }}"
  );
  return post.author;
};

const updatePostForUser = async (postId, data) => {
  const PostExists = await prisma.exists.Post({ id: postId });
  if (!PostExists) {
    throw new Error("Post Not Found");
  }
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data: { ...data }
    },
    "{ author { id name email posts { id title published}}}"
  );
  return post.author;
};

// createPostForUser("cjnqbsrb9001n0805k8wn5tpu", {
//   title: "Great Books to Readgg",
//   body: "NICE ONES",
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 4)))
//   .catch(e => console.log(e));

// updatePostForUser("cjnqc7tc5002k0805dot6q3j1", { published: false })
//   .then(user => console.log(JSON.stringify(user, undefined, 4)))
//   .catch(err => console.log(err));
