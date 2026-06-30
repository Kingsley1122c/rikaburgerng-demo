import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import { trackOrderRequest } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import './OrderTrackingPage.css';

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [tracking, setTracking] = useState(null);
  const [trackingError, setTrackingError] = useState('');

  const orderNumber = searchParams.get('order') || location.state?.orderNumber || 'RB-318291';
  const total = location.state?.grandTotal || 14200;

  useEffect(() => {
    let mounted = true;
    setTracking(null);
    setTrackingError('');

    trackOrderRequest(orderNumber)
      .then((response) => {
        if (mounted) {
          setTracking(response);
        }
      })
      .catch((error) => {
        if (mounted) {
          setTrackingError(error.message || 'Unable to fetch order tracking right now.');
        }
      });

    return () => {
      mounted = false;
    };
  }, [orderNumber]);

  return (
    <div className="tracking-page">
      <PageHeader title="Order Tracking" subtitle="Follow your meal from kitchen prep to doorstep delivery." />
      <section className="tracking-section">
        <Container>
          <div className="tracking-layout">
            <article className="tracking-panel">
              <h2>Order {tracking?.orderNumber || orderNumber}</h2>
              <p>Estimated Arrival: {tracking?.estimatedArrival || (trackingError ? '--' : 'Loading...')}</p>
              {trackingError ? <p className="auth-error">{trackingError}</p> : null}
              <div className="tracking-timeline" role="list" aria-label="Order status timeline">
                {(tracking?.timeline || []).map((step) => (
                  <div key={step.label} className={`tracking-step ${step.completed ? 'completed' : ''}`} role="listitem">
                    <h3>{step.label}</h3>
                    <p>{step.time}</p>
                  </div>
                ))}
              </div>

              <div className="tracking-driver">
                <h3>Driver</h3>
                <p>{tracking?.driver?.name || 'Assigning driver...'}</p>
                <p>{tracking?.driver?.vehicle}</p>
                <p>{tracking?.driver?.phone}</p>
              </div>
            </article>

            <aside className="tracking-summary">
              <h3>Order Summary</h3>
              <ul>
                <li><span>Order Number</span><strong>{tracking?.orderNumber || orderNumber}</strong></li>
                <li><span>Status</span><strong>Out for Delivery</strong></li>
                <li><span>Estimated Arrival</span><strong>{tracking?.estimatedArrival || '--'}</strong></li>
                <li><span>Order Total</span><strong>{formatCurrency(total)}</strong></li>
              </ul>

              <h4>Delivery Address</h4>
              <p>123 Burger Lane, Lekki Phase 1, Lagos</p>

              <div style={{ marginTop: '16px', display: 'grid', gap: '8px' }}>
                <Button type="button" variant="secondary">Contact Restaurant</Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default OrderTrackingPage;
