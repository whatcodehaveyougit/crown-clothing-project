import "./catagory.styles.scss";
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

  console.log(products);
  return (
    <div className="catagory-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default Catagory;
