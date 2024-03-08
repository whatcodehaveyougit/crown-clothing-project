import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component.jsx";
import Category from "../category/category.component.jsx";
import "./shop.styles.scss";
import { getCatagoriesAndDocuments } from "../../utils/firebase/firebase.js";
import { useEffect } from "react";
import { setCategories } from "../../store/categories/category.action.js";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // When using an async funcion inside of useEffect, don't make the useEffect async, create a new function inside.
    const getCategoriesMap = async () => {
      const categoriesArray = await getCatagoriesAndDocuments();

      // setCategories is a helperFunction
      // it takes in the categoriesArray & then has the logic inside to dispatch the actions with all the
      // correct info, the object, the params of the action TYPE & payload. Voila.
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
    // and then call the async function!
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
