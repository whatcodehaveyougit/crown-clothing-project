import { useContext, Fragment } from "react";
import { CatagoriesContext } from "../../contexts/catagories.context";
import CatagoryPreview from "../../components/catagory-preview/catagory-preview.component";

const CatagoriesPreview = () => {
  const { catagoriesMap } = useContext(CatagoriesContext);
  return (
    <>
      {
        // If you want the map to implicitly return something - use normal brakets instead of squiggley
        Object.keys(catagoriesMap).map((title) => {
          const products = catagoriesMap[title];
          return (
            <CatagoryPreview id={title} title={title} products={products} />
          );
        })
      }
    </>
  );
};

export default CatagoriesPreview;
