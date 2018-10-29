const Query = {
  posts(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }
    return prisma.query.posts(opArgs, info);
    // const { query = "" } = args;
    // let newposts = db.posts.filter(e => e.title.includes(query));
    // return newposts;
  },
  users(parent, { query }, { prisma }, info) {
    const opArgs = {};
    if (query) {
      // opArgs.where = {
      //   name_contains: query
      // };
      opArgs.where = {
        OR: [
          {
            name_contains: query
          },
          {
            email_contains: query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};
export default Query;
