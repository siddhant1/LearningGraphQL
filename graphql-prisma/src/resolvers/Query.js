const Query = {
  post(parent, args, { prisma }, info) {
    return prisma.query.posts(null, info);
    // const { query = "" } = args;
    // let newposts = db.posts.filter(e => e.title.includes(query));
    // return newposts;
  },
  user(parent, args, { prisma }, info) {
    return prisma.query.users(null, info);
  },
  comment(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};
export default Query;
