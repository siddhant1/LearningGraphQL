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
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  async updateUser(parent, { data }, { prisma, request }, info) {
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
  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    if (!postExists) {
      throw new Error("Unable to delelte Post");
    }
    return prisma.mutation.deletePost(
      {
        where: { id }
      },
      info
    );
  },
  async updatePost(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });
    if (!postExists) {
      throw new Error("Not Able to Update Post");
    }
    return prisma.mutation.updatePost({
      data: {
        ...data
      },
      where: {
        id
      }
    });
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!commentExists) {
      throw new Error("Comment Cannot Be deleted");
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId
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
  async updateComment(parent, args, { prisma }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!commentExists) {
      throw new Error("Unable to update Comment");
    }
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
