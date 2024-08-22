import { useState } from "react";
import { formatCurrency, extendedCustomRound} from "../utils"
import Checkmark from '../assets/images/icons/checkmark.png'
import rating0 from '../assets/images/ratings/rating-0.png';
import rating5 from '../assets/images/ratings/rating-5.png';
import rating10 from '../assets/images/ratings/rating-10.png';
import rating15 from '../assets/images/ratings/rating-15.png';
import rating20 from '../assets/images/ratings/rating-20.png';
import rating25 from '../assets/images/ratings/rating-25.png';
import rating30 from '../assets/images/ratings/rating-30.png';
import rating35 from '../assets/images/ratings/rating-35.png';
import rating40 from '../assets/images/ratings/rating-40.png';
import rating45 from '../assets/images/ratings/rating-45.png';
import rating50 from '../assets/images/ratings/rating-50.png';

export default function Product({ product, addToCart }) {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const ratingImages = {
    0: rating0,
    5: rating5,
    10: rating10,
    15: rating15,
    20: rating20,
    25: rating25,
    30: rating30,
    35: rating35,
    40: rating40,
    45: rating45,
    50: rating50
  };

  function getStarsUrl() {
    const ratingValue = extendedCustomRound(product.rating.rate) * 10;
    return ratingImages[ratingValue] || rating0; // Fallback to rating0 if not found
  }

  function getPrice() {
    return formatCurrency(product.price * 100);
  }

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
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
        <img 
          className="product-rating-stars" 
          src={getStarsUrl()}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>
      <div className="product-price">
        ${getPrice() * quantity}
      </div>
      <div className="product-quantity-container">
        <input
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          min="0"
          placeholder="Quantity"
        />
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