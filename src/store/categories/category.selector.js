import { createSelector } from "reselect";
// Here we transform the data into the final shape we want it to be

const selectCategoryReducer = (state) => state.categories;

// createsSelector stops the selectCategories function from re-running every time
// As that would be expensive

// THis is a memoized selector
// These are pure functions which means..
// If the input does not change then the output will not have changed either
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
  // if categoriesSlice (what we get back from selectCategoryReducer) is different.  Then it is re-run
  // So basically if state.categories is different
);
// if it is the same then the previously cached value will still be valid

// The selector is pulling off AND tranforming the array to the CatagoriesMap.
// THe selector file is where the reducers business logic should live
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
