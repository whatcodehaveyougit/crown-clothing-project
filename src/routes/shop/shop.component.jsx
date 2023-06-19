import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component.jsx";
import Category from "../category/category.component.jsx";
import "./shop.styles.scss";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../store/categories/category.action.js";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // When using an async funcion inside of useEffect, don't make the useEffect async, create a new function inside.
    // We have moved out asynchrnous and loading code into a thunk
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
