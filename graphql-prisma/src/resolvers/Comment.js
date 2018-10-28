const Comment = {
  author(parent, args, { db }, info) {
    const { author } = parent;
    return db.users.find(user => user.id == author);
  },
  post(parent, args, { db }, info) {
    const { post } = parent;
    return db.posts.find(pst => pst.id == post);
  }
};

export default Comment;
