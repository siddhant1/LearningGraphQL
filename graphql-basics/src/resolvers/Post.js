const Post = {
  author(parent, info, { db }, inf) {
    // in this case parent is the individual Post on which the query is running
    const { author } = parent;
    return db.users.find(user => {
      return user.id === author;
    });
  },
  comments(parent, info, { db }, inf) {
    const { id } = parent;
    return db.comments.filter(comment => comment.post == id);
  }
};

export default Post;