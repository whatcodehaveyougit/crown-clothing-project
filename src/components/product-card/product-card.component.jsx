import "./product-card.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.componet";
import { addItemToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  // This is not plugging in properly.
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Interesting as it runs this dispatch
  // However addItemsToCart is just a function which
  // Calls another function to run the logic
  // Then with the result of the that runs the action which will interact with the store
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
