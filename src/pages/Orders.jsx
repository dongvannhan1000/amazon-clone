import { useOutletContext } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency, calculateDeliveryDate, getDeliveryOption } from "../utils";
import '../styles/Orders.css'
import BuyAgain from '../images/icons/buy-again.png';

export default function Orders () {

  const { addToCart } = useOutletContext();
  const [orders, setOrders] = useState([]);

  

  useEffect(() => {
    // Load orders from LocalStorage when the component mounts
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(orders);
  }, []);

  const handleBuyAgain = (item) => {
    addToCart(item, 1);
  };

  const renderOrderDetails = (order) => {
    const orderTimeString = dayjs(order.date).format('MMMM D, YYYY');

    return (
      <div key={order.id} className="order-container">
        <div className="order-header">
          <div className="order-header-left-section">
            <div className="order-date">
              <div className="order-header-label">Order Placed:</div>
              <div>{orderTimeString}</div>
            </div>
            <div className="order-total">
              <div className="order-header-label">Total:</div>
              <div>${formatCurrency(order.totalAmount)}</div>
            </div>
          </div>
          <div className="order-header-right-section">
            <div className="order-header-label">Order ID:</div>
            <div>{order.id}</div>
          </div>
        </div>
        <div className="order-details-grid">
          {order.items.map((item) => {
            const deliveryOption = getDeliveryOption(item.deliveryOptionId);
            const estimatedDeliveryDate = calculateDeliveryDate(deliveryOption);
          return (
            <React.Fragment key={item.id}>
              <div className="product-order-image-container">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="product-details">
                <div className="product-order-name">
                  {item.title}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {estimatedDeliveryDate}
                </div>
                <div className="product-order-quantity">
                  Quantity: {item.quantity}
                </div>
                <button 
                  className="buy-again-button button-primary"
                  onClick={() => handleBuyAgain(item)}
                >
                  <img className="buy-again-icon" src={BuyAgain} alt="Buy again" />
                  <span className="buy-again-message">Buy it again</span>
                </button>
              </div>
              <div className="product-actions">
                <a>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </React.Fragment>
            
          )})}
        </div>
      </div>
    );
  }

  return (
    <>
    {orders.length > 0 ? (
    <div className="main-order">
      <div className="page-title-order">Your Orders</div>
      <div className="orders-grid">
        {orders.map(renderOrderDetails)}
      </div>
    </div>
    ) : (
    <div className="main-order">
      <div className="page-title-order">You have no orders yet.</div>
    </div>
    )}
    </>
  )
}