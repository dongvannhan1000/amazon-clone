import { useOutletContext } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import PaymentSummary from '../components/PaymentSumary';
import '../styles/Checkout.css'

function Checkout() {
  const { cart, setCart, removeFromCart, cartItemCount } = useOutletContext();

  return (
    <>
      {cart.length > 0 ? (
      <>
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-middle-section">
              Checkout ({cartItemCount} items)
            </div>
          </div>
        </div>
  
        <div className="main-checkout">
          <div className="page-title">Review your order</div>
  
          <div className="checkout-grid">
            <div className="order-summary">
              <OrderSummary 
                cart={cart} 
                setCart={setCart} 
                removeFromCart={removeFromCart}
              />
            </div>
  
            <div className="payment-summary">
              <PaymentSummary 
                cart={cart}
                cartItemCount={cartItemCount} 
              />
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-middle-section">
              There are no items in your cart.
            </div>
          </div>
      </div>
    )}
    </>
  )
}

export default Checkout;