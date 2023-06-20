import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/category.selector.js";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesIsLoading } from "../../store/categories/category.selector.js";

const CategoriesPreview = () => {
  // UseSelector is a hook that you pass a selector function
  // This hooks into the entire Redux store
  // Any time anything updates in the STORE this could trigger a re-render of the component
  // depending on how you code your selecter.

  // A selector function extracts the values that you want from the entire redux store

  // selectCatagories here is replacing ((state) => state.catagories)
  // As the useSelector hook gets passed the entire state

  // As can be seen in the category.selector function this then changes the format of the data
  // from an array into an Object.  We then map over the object.

  // This is done the first time and ONLY if the categories array changes does the function re-run

  const catagories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  console.log(catagories);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        catagories.map((category) => {
          const key = crypto.randomUUID();
          return (
            <CategoryPreview
              key={key}
              title={category["title"]}
              products={category.items}
            />
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
