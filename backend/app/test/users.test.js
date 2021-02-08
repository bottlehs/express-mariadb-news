const request = require('supertest');
const app = require('../../server.jest');
require("../routes/users.routes")(app);
const { v4: uuidv4 } = require('uuid');

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

describe("testing-server-users-routes", () => {
  it("POST /api/users - success", async (done) => {
    const params = {
      firstname: 'firstname',
      lastname: 'lastname',
      username: 'username',
      email: uuidv4()+'@email.com',
      password: 'password123',      
    };

    const response = await request(app).post("/api/users").send(params);
    expect(response.statusCode).toEqual(200);    
    done();

    // TODO: https://medium.com/@pojotorshemi/integration-test-on-express-restful-apis-using-jest-and-supertest-4cf5d1414ab0 를 참고하여 save_json, usStates.json 활용하기
  }),

  it("GET /api/users - success", async (done) => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toEqual(200);
    done();
  });
});