import { CategoryContainer } from "./category.styles.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component.jsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";

const Category = () => {
  const { category } = useParams();
  const categoriesReducer = useSelector(selectCategoriesMap);
  console.log(categoriesReducer);
  const catagories = categoriesReducer.catagories.categoriesMaps;
  const [products, setProducts] = useState(catagories[category]);

  useEffect(() => {
    setProducts(catagories[category]);
  }, [category, catagories]);

  return (
    <CategoryContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </CategoryContainer>
  );
};

export default Category;
