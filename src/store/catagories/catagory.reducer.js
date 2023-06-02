import { CATEGORIES_ACTION_TYPES } from "./catagory.types";

export const CATEGORIES_INITIAL_STATE = {
  catagoriesMap: {},
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CATEGORIES_MAP":
      return { ...state, categoriesMaps: payload };
    default:
      return state;
  }
};
