const User = {
  posts(parent, args, { db }, info) {
    const { id } = parent;
    return db.posts.filter(post => {
      return post.author === id;
    });
  },
  comments(parent, args, { db }, info) {
    const { id } = parent;
    return db.comments.filter(comment => comment.author == id);
  }
};

export default User;
