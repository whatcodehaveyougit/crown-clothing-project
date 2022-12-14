import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './catagory-preview.styles.scss';

const CatagoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {/* This filter ensure that only the first 4 items from the array are taken, pretty cool! */}
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CatagoryPreview;