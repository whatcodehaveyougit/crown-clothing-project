import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
// the create action takes in the type & payload and returns an object of the
// type and payload.  Very simple.  Just means we don't have to retype this all the time.
