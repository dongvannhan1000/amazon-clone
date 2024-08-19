import { Link } from 'react-router-dom';
import AmazonLogo from '../images/amazon-logo-white.png'
import AmazonMobile from '../images/amazon-mobile-logo-white.png'
import SearchIcon from '../images/icons/search-icon.png'
import CartIcon from '../images/icons/cart-icon.png'

import '../styles/Header.css';

export default function Header({cartItemCount = 0}) {
    return (
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <Link href="home" className="header-link">
            <img className="amazon-logo"
              src={AmazonLogo} />
            <img className="amazon-mobile-logo"
              src={AmazonMobile} />
          </Link>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <Link className="orders-link header-link" href="orders">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </Link>

          <Link className="cart-link header-link" href="checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{cartItemCount}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    )
}