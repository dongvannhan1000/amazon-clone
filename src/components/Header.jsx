import { Link } from 'react-router-dom';
import AmazonLogo from '../assets/images/amazon-logo-white.png'
import AmazonMobile from '../assets/images/amazon-mobile-logo-white.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'

import '../styles/Header.css';

export default function Header({cartItemCount = 0, searchTerm, onSearch}) {

  const handleSearchChange = (e) => {
    const term = e.target.value;
    onSearch(term);
  };

  return (
    <div className="amazon-header">
      <div className="amazon-header-left-section">
        <Link to="/" className="header-link">
          <img className="amazon-logo" src={AmazonLogo} alt="Amazon Logo" />
          <img className="amazon-mobile-logo" src={AmazonMobile} alt="Amazon Mobile Logo" />
        </Link>
      </div>

      <div className="amazon-header-middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search products"
        />
        <button 
          className="search-button" 
          aria-label="Submit search">
          <img className="search-icon" src={SearchIcon} alt="Search" />
        </button>
      </div>

      <div className="amazon-header-right-section">
        <Link to="/orders" className="orders-link header-link">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </Link>

        <Link to="/checkout" className="cart-link header-link">
          <img className="cart-icon" src={CartIcon} alt="Cart Icon" />
          <div className="cart-quantity">{cartItemCount}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  )
}