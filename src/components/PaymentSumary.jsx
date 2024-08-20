import { formatCurrency } from "../utils";
import { getDeliveryOption } from "../utils";

export default function PaymentSummary({cart, cartItemCount}) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((item) => {
    productPriceCents += item.price * item.quantity * 100;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const cartQuantity = cartItemCount;

  return (
    <>
      <div className="payment-summary-title">
        Order Summary
      </div>

      <div className="payment-summary-row">
        <div>Items({cartQuantity}):</div>
        <div className="payment-summary-money">${formatCurrency(productPriceCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money js-payment-summary-shipping">${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">${formatCurrency(totalCents)}</div>
      </div>

      <button className="place-order-button button-primary">
        Place your order
      </button>
    </>
  )
}