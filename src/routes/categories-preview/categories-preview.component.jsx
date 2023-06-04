import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/category.selector.js";

const CategoriesPreview = () => {
  const catagories = useSelector(selectCategories);
  return (
    <>
      {
        catagories &&
          Object.keys(catagories).map((title) => {
            const products = catagories[title];
            return (
              <CategoryPreview id={title} title={title} products={products} />
            );
          })
        // If you want the map to implicitly return something - use normal brakets instead of squiggley
      }
    </>
  );
};

export default CategoriesPreview;
