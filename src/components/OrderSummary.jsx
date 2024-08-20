import { calculateDeliveryDate, deliveryOptions, getDeliveryOption, formatCurrency } from "../utils"
import { useState, useEffect } from "react";

export default function OrderSummary({cart, setCart, removeFromCart}) {

  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState({});
  const [editingQuantity, setEditingQuantity] = useState({});
  const [tempQuantity, setTempQuantity] = useState({});

  useEffect(() => {
    const initialOptions = {};
    cart.forEach(item => {
      initialOptions[item.id] = item.deliveryOptionId || deliveryOptions[0].id;
    });
    setSelectedDeliveryOptions(initialOptions);
  }, [cart]);

  const handleDeliveryOptionChange = (productId, deliveryOptionId) => {
    setSelectedDeliveryOptions(prev => ({
      ...prev,
      [productId]: deliveryOptionId
    }));

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, deliveryOptionId: deliveryOptionId } : item
      )
    );
  };

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const handleUpdateClick = (productId) => {
    setEditingQuantity(prev => ({ ...prev, [productId]: true }));
  };

  const handleSaveClick = (productId) => {
    const newQuantity = tempQuantity[productId];
    if (newQuantity && newQuantity > 0) {
      handleQuantityUpdate(productId, newQuantity);
      setEditingQuantity(prev => ({ ...prev, [productId]: false }));
    } else {
      // Handle invalid quantity (e.g., show an error message)
      console.error("Invalid quantity");
    }
  };

  const handleQuantityInputChange = (productId, value) => {
    setTempQuantity(prev => ({ ...prev, [productId]: value }));
  };

  const renderDeliveryOptions = (product) => {
    return deliveryOptions.map((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = selectedDeliveryOptions[product.id] === deliveryOption.id;

      return (
        <div 
          key={`${product.id}-${deliveryOption.id}`}
          className="delivery-option"
        >
          <input 
            type="radio" 
            id={`delivery-option-${product.id}-${deliveryOption.id}`}
            checked={isChecked}
            className="delivery-option-input"
            name={`delivery-option-${product.id}`}
            onChange={() => handleDeliveryOptionChange(product.id, deliveryOption.id)}
          />
          <label htmlFor={`delivery-option-${product.id}-${deliveryOption.id}`}>
            <div className="delivery-option-date">
              {dateString}
            </div>
            <div className="delivery-option-price">
              {priceString} Shipping
            </div>
          </label>

            

        </div>
      );
    });
  };

  return (
    <div>
      {cart.map(item => {
        const deliveryOption = getDeliveryOption(selectedDeliveryOptions[item.id] || '1');
        const dateString = calculateDeliveryDate(deliveryOption);
        const isEditing = editingQuantity[item.id];

        return (
          <div key={item.id} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dateString}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <div className="product-name limit-text-to-2-lines">
                  {item.title}
                </div>
                <div className="product-price">
                  ${item.price}
                </div>
                <div className={`product-quantity ${isEditing ? 'is-editing-quantity' : ''}`}>
                  <span>
                    Quantity: {' '}
                    <span className="quantity-label">
                      {item.quantity}
                    </span>
                    <input 
                      type="number" 
                      value={tempQuantity[item.id] || item.quantity} 
                      onChange={(e) => handleQuantityInputChange(item.id, parseInt(e.target.value))}
                      min="1"
                      className="quantity-input"
                    />
                  </span>
                  <span 
                    className="update-quantity-link link-primary" 
                    onClick={() => handleUpdateClick(item.id)}
                  >
                    Update
                  </span>
                  <span 
                    className="save-quantity-link link-primary" 
                    onClick={() => handleSaveClick(item.id)}
                  >
                    Save
                  </span>
                  <span 
                    className="delete-quantity-link link-primary" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {renderDeliveryOptions(item)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )

}