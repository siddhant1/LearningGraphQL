import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password Must be 8 characters or longer");
    }
    const password = await bcrypt.hash(args.data.password, 10);
    console.log(password);
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password }
    });
    console.log(user);
    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisissupersecrettoo")
    };
  },

  async login(
    parent,
    {
      data: { email, password }
    },
    { prisma },
    info
  ) {
    const user = await prisma.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to Login");
    }
    return {
      user,
      token: jwt.sign({ userId: user.id }, "thisissupersecrettoo")
    };
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id });
    if (!userExists) {
      throw new Error("User Not found");
    }

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  async updateUser(parent, {data }, { prisma, request }, info) {
    const id = getUserId(request);
    return prisma.mutation.updateUser({ data, where: { id } }, info);
  },
  createPost(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const dataArgs = {
      ...data,
      author: {
        connect: {
          id: userId
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
