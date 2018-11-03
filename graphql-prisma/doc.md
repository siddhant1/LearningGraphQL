# GQL Fragements
When the User Query is ran , it goes to prisma and gets users , then on every User object it calls seperate resolvers if they exist in resolver object

Not depending on the selection set if we are using any property that the user is not querying then it will give redundant results

Thats where fragements come into picture
