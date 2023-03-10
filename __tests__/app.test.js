const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const endpoints_json = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("App", () => {
  describe("Invalid Endpoint", () => {
    it("Returns a 404 status and and and object with a key msg and a value 'Path not found'", () => {
      return request(app)
        .get("/wrong-endpoint")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found!");
        });
    });
  });
  describe("GET /api", () => {
    it("200 - Returns a JSON representation of all the available endpoints of the api", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { endpoints } = body;
          expect(endpoints).toEqual(endpoints_json);
        });
    });
  });
  describe("GET api/topics", () => {
    it("Should receive a 200 status and an object with a topics key and an array of object topics as a value. Each topic will have the slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
            expect(topics.length).toBe(3);
          });
        });
    });
  });

  describe("GET api/articles", () => {
    it("Should receive a 200 status and an object with an articles key and an array of object articles (sorted desc by its creation date) as a value.", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("created_at", { descending: true });
          articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
          });
        });
    });
    it("200 - We can sort by another column (author, title, ...)", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "title" })
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("title", { descending: true });
        });
    });
    it("200 - We can change the sorting order", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "article_id", order: "asc" })
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("article_id", { descending: false });
        });
    });
    it("200 - We can filter by an specific topic", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "article_id", order: "asc", topic: "mitch" })
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(11);
          expect(articles[0].title).toBe("Living in the shadow of a great man");
          articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: "mitch",
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
          });
        });
    });
    it("200 - Empty happy path. E.g. When we filter by a valid topic but there are not articles with that topic", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "article_id", order: "asc", topic: "paper" })
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(0);
          expect(body).toEqual({ articles: [] });
        });
    });
    it("400 - Bad request: Invalid sort_by query", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "papaya", order: "asc", topic: "paper" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid sort query");
        });
    });
    it("400 - Bad request: Invalid order query", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "article_id", order: "papaya", topic: "paper" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid order query");
        });
    });
    it("404 - Topic not found", () => {
      return request(app)
        .get("/api/articles")
        .query({ sort_by: "article_id", order: "asc", topic: "papaya" })
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Topic not found");
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    // Happy path
    it("Should receive a 200 status code and an object with a key of articles and the specified article as value", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.title).toBe("Eight pug gifs that remind me of mitch");
          expect(article.article_id).toBe(3);
          expect(article.author).toBe("icellusedkars");
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            body: expect.any(String),
          });
        });
    });
    it("It should include a comment_count key", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.title).toBe("Eight pug gifs that remind me of mitch");
          expect(article.article_id).toBe(3);
          expect(article.author).toBe("icellusedkars");
          expect(article.comment_count).toBe(2);
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            body: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
    });
    // 400 - Invalid input
    it("Should receive a 400 status code and an object with a key of msg and the string 'Invalid input as' value", () => {
      return request(app)
        .get("/api/articles/one")
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });
    // 404 - Article not found
    it("Should receive a 404 status code and an object with a key of msg and the string 'Article not found' as a value", () => {
      return request(app)
        .get("/api/articles/1213123")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Article not found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    // Happy path
    it("Should receive a 200 status code and a response object with a key of comments and an array of comments as value", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments.length).toBe(2);
          expect(comments[0].body).toBe("Ambidextrous marsupial");
          expect(comments).toBeSortedBy("created_at", { descending: true });
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            });
          });
        });
    });
    // Empty happyy path (valid article ID but not comments)
    it("Should recieve a 200 status code and a response object with a key of comments and an empty array as value if there are no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments.length).toBe(0);
          expect(body).toEqual({ comments: [] });
        });
    });
    // 400 - Invalid input
    it("Should receive a 400 status code and a response object with a key of msg and the string 'Invalid input' as value when an invalid input is passed", () => {
      return request(app)
        .get("/api/articles/One/comments")
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
          expect(body).toEqual({ msg: "Invalid input" });
        });
    });
    // 404 - Article not found (invalid article Id)
    it("Should receive a 404 status code and a response object with a key of msg and the string 'Article not found' as value when an invalid article id is passed", () => {
      return request(app)
        .get("/api/articles/1123123123/comments")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe(
            "Could not fetch comments. Article id provided not found"
          );
          expect(body).toEqual({
            msg: "Could not fetch comments. Article id provided not found",
          });
        });
    });
  });

  describe("POST - /api/articles/:article_id/comments", () => {
    // Happy PATH 201 - Returns inserted object
    it("Returns a 201 status code and a response object with a key of comment and the comment object that has been inserted", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({ username: "butter_bridge", body: "This is a new comment" })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment.article_id).toBe(2);
          expect(comment.body).toBe("This is a new comment");
          expect(comment.author).toBe("butter_bridge");
          expect(comment.comment_id).toBe(19);
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
    });
    // 400 - Invalid input. No body provided.
    it("Returns a 400 status code and a response object with a key of msg and a string 'No body or username key provided in the body of the request' as value", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe(
            "No body or username key provided in the body of the request"
          );
        });
    });
    // 400 - Invalid
    it("Returns a 400 status code and a response object with a key of msg and a string 'Invalid input'", () => {
      return request(app)
        .post("/api/articles/monkey/comments")
        .send({ username: "butter_bridge", body: "This is a new comment" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });

    // 404 - username not found
    it("Returns a 404 status code and a response object with a key of msg and a string 'Not found' as value when enter a wrong username", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({ username: "Jorge", body: "This is a new comment" })
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Not found");
        });
    });
    // 404 - article not found
    it("Returns a 404 status code and a response object with a key of msg and a string 'Not found' as value when the entered a valid but wrong article ID", () => {
      return request(app)
        .post("/api/articles/4234234/comments")
        .send({ username: "butter_bridge", body: "This is a new comment" })
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Not found");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    // Happy path
    it("Should receive a 200 status and an object with an article key the modified object as value", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.title).toBe("Living in the shadow of a great man");
          expect(article.votes).toBe(110);
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            body: expect.any(String),
          });
        });
    });
    // 400 - Bad request - Invalid input
    it("Should receive a 400 status and an object with an msg key and the string 'Invalid input'  as value", () => {
      return request(app)
        .patch("/api/articles/papaya")
        .send({ inc_votes: 10 })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });
    // 404 - Not found article
    it("Should receive a 404 status and an object with an msg key and the string 'Article not found'  as value", () => {
      return request(app)
        .patch("/api/articles/42342")
        .send({ inc_votes: 10 })
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Article not found");
        });
    });
    it("400 - Bad request: e.g. no inc_votes on body request. It should respond with a object with msg key and value 'Invalid input' ", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({})
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input. Votes is a not null key");
        });
    });
    it("400 - Bad request: invalid inc_votes {inc_votes: 'cat'} should respond with a object with msg key and value 'Invalid input' ", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ inc_votes: "cats" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });
  });
  describe("GET /api/users", () => {
    it("Should receive a 200 status and an object with a users key and an array of object users as value.", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users.length).toBe(4);
          expect(users[2].name).toBe("paul");
          users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });

  describe("DELETE /api/comments/:comment_id", () => {
    it("204 - Should delete the specified comment for the database and return no body for response", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then((response) => {
          expect(response.body).toEqual({});
        });
    });
    it("400 - Bad request: Invalid comment Id.", () => {
      return request(app)
        .delete("/api/comments/One")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid input");
        });
    });
    it("404 - Not found: Valid comment Id, but no such id in comments", () => {
      return request(app)
        .delete("/api/comments/123123")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Comment Id not found");
        });
    });
  });

  describe("GET /users/:username", () => {
    it("Should receive a 200 status and an object with a user key and a user object as value.", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          const { user } = body;
          expect(user).toEqual({
            username: "lurker",
            name: "do_nothing",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          });
        });
    });
    it("404 - Username not found", () => {
      return request(app)
        .get("/api/users/jorge")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Username not found");
        });
    });
  });

  describe("PATCH /comments/:comment_id", () => {
    it("Should receive a 200 status and an object with a comment key and the modified comment object as a value.", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({ inc_votes: 1000 })
        .expect(200)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment.votes).toBe(1100);
          expect(comment.article_id).toBe(1);
          expect(comment.comment_id).toBe(3);
          expect(comment.author).toBe("icellusedkars");
          expect(comment.body).toBe(
            "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy ??? onyou it works."
          );
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
    });
    it("400 - Invalid input: the key 'inc_votes' is not included in the request body", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({})
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input. Votes is a not null key");
        });
    });
    it("404 - Comment not found", () => {
      return request(app)
        .patch("/api/comments/323423")
        .send({ inc_votes: 1000 })
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Comment not found");
        });
    });
    it("400 - Bad request: the value of inc_votes is an invalid input", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({ inc_votes: "potato" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });
    it("400 - Bad request: the value the comment_id is an invalid input", () => {
      return request(app)
        .patch("/api/comments/potato")
        .send({ inc_votes: "1" })
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Invalid input");
        });
    });
  });
});
