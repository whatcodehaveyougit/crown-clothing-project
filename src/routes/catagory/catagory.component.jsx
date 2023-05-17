import { CatagoryContainer } from "./catagory.styles.jsx";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CatagoriesContext } from "../../contexts/catagories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Catagory = () => {
  const { catagory } = useParams();
  const { catagoriesMap } = useContext(CatagoriesContext);
  const [products, setProducts] = useState(catagoriesMap[catagory]);

  useEffect(() => {
    setProducts(catagoriesMap[catagory]);
  }, [catagory, catagoriesMap]);

  return (
    <CatagoryContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </CatagoryContainer>
  );
};

export default Catagory;
