const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      //Step1 : Set up a subscription
      let count = 0;
      setInterval(() => {
        count++;
        //Step2 Publish to subscription
        pubsub.publish("count", { count });
      }, 1000);
      return pubsub.asyncIterator("count");
    }
  },
  comment: {
    subscribe(parent, args, { pubsub, db }, info) {
      let post = db.posts.find(post => post.id === args.postId);
      if (!post) {
        throw new Error("No Post Found");
      }
      return pubsub.asyncIterator(`comment ${post.id}`);
    }
  },
  post: {
    subscribe(parent, args, { pubsub, db }, info) {
      return pubsub.asyncIterator("post");
    }
  }
};
export default Subscription;
