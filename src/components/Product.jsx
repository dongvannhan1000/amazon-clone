import { useState } from "react";
import formatCurrency from "../utils"
import Checkmark from '../images/icons/checkmark.png'

export default function Product({ product, addToCart }) {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  function getPrice() {
    return formatCurrency(product.price * 100);
  }

  const createQuantityOptions = (max) => {
    return Array.from({ length: max }, (_, i) => (
      <option key={i + 1} value={i + 1}>{i + 1}</option>
    ));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.title}/>
      </div>
      <div className="product-name limit-text-to-2-lines">
        ${product.title}
      </div>
      <div className="product-rating-container">
        <div className="product-rating-stars">{product.rating.rate}</div>
        <div className="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      <div className="product-price">
        ${getPrice()}
      </div>
      <div className="product-quantity-container">
        <select 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {createQuantityOptions(10)}
        </select>
      </div>
 
      <div className="product-spacer"></div>
      <div className={`added-to-cart ${isAdded ? 'visible' : ''}`}>
        <img src={Checkmark} alt="Added" /> Added
      </div>
      <button className="add-to-cart-button button-primary"
        onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  )
}