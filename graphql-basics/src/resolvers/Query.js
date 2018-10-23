const Query = {
  post(parent, args, { db }, info) {
    const { query = "" } = args;
    let newposts = db.posts.filter(e => e.title.includes(query));
    return newposts;
  },
  user(parent, args, { db }, info) {
    return db.users;
  },
  comment(parent, args, { db }, info) {
    return db.comments;
  }
};
export default Query;
