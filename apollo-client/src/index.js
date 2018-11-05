import ApolloBoost, { gql } from "apollo-boost";

const client = new ApolloBoost({
  uri: "http://localhost:4000/"
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

const getPosts = gql`
  query {
    posts(orderBy: createdAt_DESC) {
      id
      title
      author {
        name
      }
    }
  }
`;

client
  .query({
    query: getPosts
  })
  .then(response => {
    let posts = document.getElementById("posts");
    console.log(response);
    response.data.posts.forEach(post => {
      posts.innerHTML += `
      
      <div>
      <h3>name : ${post.title}</h3>
      <h3>Author : ${post.author.name}</h3>

      </div>
      `;
    });
  });
client
  .query({
    query: getUsers
  })
  .then(response => {
    let users = document.getElementById("users");
    response.data.users.forEach(user => {
      users.innerHTML += `
      
      <div>
      <h3>${user.name}</h3>
      </div>
      `;
    });
  });
console.log("this should show up");
