import { createSelector } from "reselect";
// Here we transform the data into the final shape we want it to be

// This selector will get re-run when other bits of state update. As it is not memoized.
const selectCategoryReducer = (state) => {
  console.log("category update");
  return state.categories;
};

// createsSelector stops the selectCategories function from re-running every time as that would be expensive

// CreateSelector is a memoized selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // if categoriesSlice which we get back from selectCategoryReducer is different.
  // Then this function is re-run
  // So basically if state.categories is different
  // Otherwise is returns the same object in memory as before, the previously calculated value
  (categoriesSlice) => {
    console.log("cat 2 update");
    return categoriesSlice.categories;
  }
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

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
