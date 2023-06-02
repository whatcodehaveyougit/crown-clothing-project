import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";

const CategoriesPreview = () => {
  const catagoriesMap = useSelector(selectCategoriesMap);
  console.log(catagoriesMap + "hellooo");
  return (
    <>
      {
        catagoriesMap &&
          Object.keys(catagoriesMap).map((title) => {
            const products = catagoriesMap[title];
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
