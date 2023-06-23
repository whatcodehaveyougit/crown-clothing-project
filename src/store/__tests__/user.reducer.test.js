import { userReducer } from "../user/user.reducer";
import { USER_ACTION_TYPES } from "../user/user.types";

describe("test reducers", () => {
  it("should return initial state", () => {
    expect(userReducer(undefined, {})).toEqual({ currentUser: null });
  });

  it("should return user given", () => {
    expect(
      userReducer(undefined, {
        type: USER_ACTION_TYPES.SET_CURRENT_USER,
        payload: "user1",
      })
    ).toEqual({ currentUser: "user1" });
  });

  it("should change user", () => {
    expect(
      userReducer(
        { currentUser: "crazyUser" },
        {
          type: USER_ACTION_TYPES.SET_CURRENT_USER,
          payload: "user1",
        }
      )
    ).toEqual({ currentUser: "user1" });
  });
});
