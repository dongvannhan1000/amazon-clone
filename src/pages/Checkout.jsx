import { useOutletContext } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import '../styles/Checkout.css'

function Checkout() {
  const { cart, setCart, removeFromCart, cartItemCount } = useOutletContext();

  return (
    <>
      <div className="checkout-header">
        Checkout({cartItemCount} items) 
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
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;