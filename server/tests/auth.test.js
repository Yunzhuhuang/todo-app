const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/User");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should not register a user with an existing email", async () => {
    await request(app).post("/api/register").send({
      username: "user1",
      email: "duplicate@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/register").send({
      username: "user2",
      email: "duplicate@example.com",
      password: "password456",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toMatch("User already exists, please log in");
  });

  it("should log in a registered user", async () => {
    await request(app).post("/api/register").send({
      username: "logintest",
      email: "logintest@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/login").send({
      email: "logintest@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should reject login with wrong password", async () => {
    await request(app).post("/api/register").send({
      username: "wrongpass",
      email: "wrongpass@example.com",
      password: "rightpassword",
    });
    const res = await request(app).post("/api/login").send({
      email: "wrongpass@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toMatch(/invalid/i);
  });
});
