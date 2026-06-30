import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import EmptyState from '../components/common/EmptyState';
import Reveal from '../components/common/Reveal';
import Button from '../components/ui/Button';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { ROUTES } from '../constants/routes';
import { formatCurrency } from '../utils/formatCurrency';
import './WishlistPage.css';

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page">
      <PageHeader title="My Wishlist" subtitle="Save your favorite meals and move them to cart when ready." />
      <section className="wishlist-section">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              title="Your wishlist is empty"
              description="Tap the heart icon on meals to save them here."
              action={<Button as={Link} to={ROUTES.MENU}>Browse Menu</Button>}
            />
          ) : (
            <div className="wishlist-grid" role="list" aria-label="Wishlist meals">
              {items.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.03}>
                  <article className="wishlist-card" role="listitem">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="wishlist-content">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p><strong>{formatCurrency(item.price)}</strong></p>
                      <div className="wishlist-actions">
                        <Button type="button" onClick={() => addToCart(item)}>Move to Cart</Button>
                        <Button type="button" variant="ghost" onClick={() => removeFromWishlist(item.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default WishlistPage;
