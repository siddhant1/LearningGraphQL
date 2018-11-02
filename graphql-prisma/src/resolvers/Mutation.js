import uuidv4 from "uuid/v4";
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("Email Taken");
    }
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) {
      throw new Error("User Not found");
    }

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  async updateUser(parent, { id, data }, { prisma }, info) {
    const userExists = await prisma.exists.User({ id });
    if (!userExists) {
      throw new Error("User Not Found");
    }
    return prisma.mutation.updateUser({ data, where: { id } }, info);
  },
  createPost(parent, { data }, { prisma }, info) {
    const dataArgs = {
      ...data,
      author: {
        connect: {
          id: data.author
        }
      }
    };
    return prisma.mutation.createPost({ data: dataArgs }, info);
  },
  deletePost(parent, { id }, { prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: { id }
      },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost({
      data: {
        ...args.data
      },
      where: {
        id: args.id
      }
    });
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    );
  }
};
export default Mutation;
