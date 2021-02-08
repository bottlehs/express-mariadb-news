import UsersService from "../users.service";
jest.mock("axios");

describe("UsersService", () => {
  it("find all", () => {
    let params = {};
    console.log(UsersService);
    console.log(UsersService.findAll);
    expect.assertions(1);
    // return Users.all().then(data=>expect(data).toEqual(users));
    return UsersService.findAll(params, null)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
