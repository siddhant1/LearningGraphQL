import getUserId from "../utils/getUserId";
const Query = {
  myPosts(parent, { skip, first, after, orderBy }, { prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      skip,
      after,
      first,
      orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true
      }
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };
    if (query) {
      // opArgs.where = {
      //   name_contains: query
      // };
      opArgs.where = {
        OR: [
          {
            name_contains: query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  comments(parent, { first, skip, after, orderBy }, { prisma }, info) {
    return prisma.query.comments({ first, skip, after, orderBy }, info);
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [
          {
            published: true
          },
          {
            author: {
              id: userId
            }
          }
        ]
      }
    });
    if (posts.length === 0) {
      throw new Error("No post found");
    }
    return posts[0];
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({
      where: {
        id: userId
      }
    });
  }
};
export default Query;
