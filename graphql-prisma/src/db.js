let posts = [
  {
    id: "123",
    title: "GAG",
    body: "GAG",
    author: "1"
  },
  {
    id: "1234",
    title: "GAGA",
    body: "GAGA",
    author: "1"
  },
  {
    id: "1235",
    title: "Hey",
    body: "hey",
    author: "2"
  }
];
let users = [
  {
    id: "1",
    name: "Siddhant",
    email: "sidhant.manchanda@gmail.com",
    age: 12
  },
  {
    id: "2",
    name: "Alok",
    email: "siddhantmanchanda98@gmail.com",
    age: 11
  }
];
let comments = [
  {
    id: "1",
    text: "Hey i am Siddhant , this is a test comment",
    author: "1",
    post: "123"
  },
  {
    id: "2",
    text: "hey i am another siddhant and this is also a test comment",
    author: "1",
    post: "1234"
  },
  {
    id: "3",
    text: "This worked for me thanks",
    author: "2",
    post: "123"
  }
];
const db = {
  users,
  comments,
  posts
};
export default db;
