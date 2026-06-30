import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import { useCart } from '../hooks/useCart';
import { ROUTES } from '../constants/routes';
import { formatCurrency } from '../utils/formatCurrency';
import { placeOrderRequest } from '../services/orderService';
import './CheckoutPage.css';

const steps = ['Customer Information', 'Delivery Address', 'Delivery Method', 'Payment Method', 'Order Review', 'Order Success'];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderMeta, setOrderMeta] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: 'Lagos',
    area: '',
    notes: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
  });

  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = items.length ? 1200 : 0;
  const tax = Math.round(cartTotal * 0.075);
  const grandTotal = cartTotal + deliveryFee + tax;

  const validStep = useMemo(() => {
    if (currentStep === 0) {
      return formData.fullName.length > 2 && formData.email.includes('@') && formData.phone.length > 7;
    }
    if (currentStep === 1) {
      return formData.addressLine1.length > 5 && formData.area.length > 2;
    }
    return true;
  }, [currentStep, formData]);

  const moveNext = () => {
    if (!validStep) {
      setError('Please complete required fields before continuing.');
      return;
    }
    setError('');
    setCurrentStep((previous) => Math.min(previous + 1, steps.length - 1));
  };

  const moveBack = () => {
    setError('');
    setCurrentStep((previous) => Math.max(previous - 1, 0));
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await placeOrderRequest({ items, formData, grandTotal });
      setOrderMeta(response);
      clearCart();
      setCurrentStep(5);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
          <input
            aria-label="Full name"
            placeholder="Full name"
            value={formData.fullName}
            onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
          />
          <input
            type="email"
            aria-label="Email address"
            placeholder="Email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            aria-label="Phone number"
            placeholder="Phone"
            value={formData.phone}
            onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </form>
      );
    }

    if (currentStep === 1) {
      return (
        <form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
          <input
            aria-label="Address line"
            placeholder="Address line"
            value={formData.addressLine1}
            onChange={(event) => setFormData((prev) => ({ ...prev, addressLine1: event.target.value }))}
          />
          <input
            aria-label="Delivery area"
            placeholder="Area"
            value={formData.area}
            onChange={(event) => setFormData((prev) => ({ ...prev, area: event.target.value }))}
          />
          <select aria-label="City" value={formData.city} onChange={(event) => setFormData((prev) => ({ ...prev, city: event.target.value }))}>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
          <textarea
            aria-label="Delivery notes"
            placeholder="Delivery notes"
            value={formData.notes}
            onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </form>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="checkout-options">
          <label className="checkout-option">
            <input
              type="radio"
              name="deliveryMethod"
              checked={formData.deliveryMethod === 'standard'}
              onChange={() => setFormData((prev) => ({ ...prev, deliveryMethod: 'standard' }))}
            />
            Standard Delivery (35 - 45 mins)
          </label>
          <label className="checkout-option">
            <input
              type="radio"
              name="deliveryMethod"
              checked={formData.deliveryMethod === 'express'}
              onChange={() => setFormData((prev) => ({ ...prev, deliveryMethod: 'express' }))}
            />
            Express Delivery (20 - 30 mins)
          </label>
          <label className="checkout-option">
            <input
              type="radio"
              name="deliveryMethod"
              checked={formData.deliveryMethod === 'pickup'}
              onChange={() => setFormData((prev) => ({ ...prev, deliveryMethod: 'pickup' }))}
            />
            Store Pickup (15 mins)
          </label>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="checkout-options">
          <label className="checkout-option">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'card'}
              onChange={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
            />
            Card Payment (UI only)
          </label>
          <label className="checkout-option">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'bank'}
              onChange={() => setFormData((prev) => ({ ...prev, paymentMethod: 'bank' }))}
            />
            Bank Transfer (UI only)
          </label>
          <label className="checkout-option">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'cod'}
              onChange={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))}
            />
            Cash on Delivery
          </label>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div>
          <h3>Order Review</h3>
          <p>Customer: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Address: {formData.addressLine1}, {formData.area}, {formData.city}</p>
          <p>Delivery Method: {formData.deliveryMethod}</p>
          <p>Payment Method: {formData.paymentMethod}</p>
          <p>Estimated Delivery: 35 - 45 mins</p>
        </div>
      );
    }

    return (
      <div className="checkout-success">
        <h2>Order Confirmed</h2>
        <p>Order Number: <strong>{orderMeta?.orderNumber}</strong></p>
        <p>Estimated Delivery: {orderMeta?.estimatedDelivery}</p>
        <p>Thank you for choosing RikaburgerNG.</p>
        <div className="checkout-actions">
          <Button as={Link} to={ROUTES.MENU}>Continue Shopping</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(ROUTES.ORDER_TRACKING, { state: { orderNumber: orderMeta?.orderNumber, grandTotal } })}
          >
            Track Order
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="checkout-page">
      <PageHeader title="Checkout" subtitle="Complete your order in a few easy steps." />
      <section className="checkout-section">
        <Container>
          <div className="checkout-layout">
            <article className="checkout-panel">
              <div className="checkout-steps" aria-label="Checkout steps">
                {steps.map((step, index) => (
                  <button
                    key={step}
                    type="button"
                    className={index === currentStep ? 'active' : ''}
                    onClick={() => {
                      if (index <= currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  >
                    {index + 1}. {step}
                  </button>
                ))}
              </div>

              {error ? <p className="auth-error">{error}</p> : null}
              {renderStep()}

              {currentStep < 5 ? (
                <div className="checkout-actions">
                  <Button type="button" variant="ghost" onClick={moveBack} disabled={currentStep === 0 || loading}>
                    Back
                  </Button>
                  {currentStep < 4 ? (
                    <Button type="button" onClick={moveNext}>Continue</Button>
                  ) : (
                    <Button type="button" onClick={placeOrder} disabled={loading || !items.length}>
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  )}
                </div>
              ) : null}
            </article>

            <aside className="checkout-summary">
              <h3>Receipt Summary</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} x{item.quantity}</span>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <ul>
                <li><span>Subtotal</span><strong>{formatCurrency(cartTotal)}</strong></li>
                <li><span>Delivery</span><strong>{formatCurrency(deliveryFee)}</strong></li>
                <li><span>Tax</span><strong>{formatCurrency(tax)}</strong></li>
                <li><span>Total</span><strong>{formatCurrency(grandTotal)}</strong></li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CheckoutPage;
