import '../styles/Header.css';

export default function Header() {
    return (
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <a href="home" className="header-link">
            <img className="amazon-logo"
              src="../images/amazon-logo-white.png" />
            <img className="amazon-mobile-logo"
              src="../images/amazon-mobile-logo-white.png" />
          </a>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="../images/icons/search-icon.png" />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <a className="orders-link header-link" href="orders">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </a>

          <a className="cart-link header-link" href="checkout">
            <img className="cart-icon" src="../images/icons/cart-icon.png" />
            <div className="cart-quantity"></div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
    )
}