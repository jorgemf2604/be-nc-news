const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");

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
    it("Should receive a 200 status and an object with a articles key and an array of object articles (sorted by its creation date) as a value.", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(12);
          expect(articles).toBeSorted({ key: "created_at" });
          expect(articles[6].comment_count).toBe(11);
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
  });
});
