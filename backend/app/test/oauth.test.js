const request = require('supertest');
const app = require('../../server.jest');
require("../routes/oauth.routes")(app);

jest.mock("./save_json", () => ({
  save: jest.fn(),
}));

jest.mock("./usStates.json", () => [
  {
    state: "MI",
    capital: "Lansing",
    governor: "Gretchen Whitmer",
  },
  {
    state: "GA",
    capital: "Atlanta",
    governor: "Brian Kemp",
  },
]);

describe("testing-server-oauth-routes", () => {
  it("POST /api/oauth/login - success", async (done) => {
    const params = {
      email: "57fb9c66-d1ec-42ac-81a6-a076557246ea@email.com",
      password: "password123"
    };
    const response = await request(app).post("/api/oauth/login").send(params);
    expect(response.statusCode).toEqual(200);
    done();
  });
});