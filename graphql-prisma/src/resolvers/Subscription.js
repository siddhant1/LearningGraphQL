import getUserId from "../utils/getUserId";

const Subscription = {
  // count: {
  //   subscribe(parent, args, { pubsub }, info) {
  //     //Step1 : Set up a subscription
  //     let count = 0;
  //     setInterval(() => {
  //       count++;
  //       //Step2 Publish to subscription
  //       pubsub.publish("count", { count });
  //     }, 1000);
  //     return pubsub.asyncIterator("count");
  //   }
  // },
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId
              }
            }
          }
        },
        info
      );
      // let post = db.posts.find(post => post.id === args.postId);
      // if (!post) {
      //   throw new Error("No Post Found");
      // }
      // return pubsub.asyncIterator(`comment ${post.id}`);
    }
  },
  post: {
    subscribe(parent, args, { db, prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true
            }
          }
        },
        info
      );
    }
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId
              }
            }
          }
        },
        info
      );
    }
  }
};
export default Subscription;
