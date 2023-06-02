import { Route, Routes } from "react-router-dom";
import CatagoriesPreview from "../catagories-preview/catagories-preview.component.jsx";
import Catagory from "../catagory/catagory.component.jsx";
import "./shop.styles.scss";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CatagoriesPreview />} />
      <Route path=":catagory" element={<Catagory />} />
    </Routes>
  );
};

export default Shop;
