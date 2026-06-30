import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { GiHamburger } from 'react-icons/gi'; // Using a different icon for cards
import './MealCard.css';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatCurrency } from '../utils/formatCurrency';
import { getImageWithFallback } from '../utils/image';
import Button from './ui/Button';

const FALLBACK_IMAGE = '/images/meal-placeholder.svg';

const MealCard = ({ meal }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const imageSource = getImageWithFallback(meal.image, FALLBACK_IMAGE);
  const wished = isInWishlist(meal.id);

  return (
    <div className="meal-card">
      <div className="meal-card-image-container">
        <img
          src={imageSource}
          alt={meal.name}
          className="meal-card-image"
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
              return;
            }
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <GiHamburger className="meal-card-image-placeholder" aria-hidden="true" />
      </div>
      <div className="meal-card-content">
        <h3 className="meal-card-name">{meal.name}</h3>
        <p className="meal-card-description">{meal.description}</p>
        <div className="meal-card-footer">
          <span className="meal-card-price">{formatCurrency(meal.price)}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              type="button"
              className="add-to-cart-btn"
              onClick={() => toggleWishlist(meal)}
              aria-label={`${wished ? 'Remove' : 'Add'} ${meal.name} ${wished ? 'from' : 'to'} wishlist`}
            >
              <FiHeart fill={wished ? 'currentColor' : 'none'} />
            </Button>
            <Button
              type="button"
              className="add-to-cart-btn"
              onClick={() => addToCart(meal)}
              aria-label={`Add ${meal.name} to cart`}
            >
              <FaCartPlus />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
