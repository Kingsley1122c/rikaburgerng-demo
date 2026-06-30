import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/common/Reveal';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';
import QuantitySelector from '../components/ui/QuantitySelector';
import Modal from '../components/ui/Modal';
import RatingStars from '../components/ui/RatingStars';
import { mealCategories, menuMeals } from '../data/menuData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import './MenuPage.css';

const MenuPage = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quantities, setQuantities] = useState({});
  const [activeMeal, setActiveMeal] = useState(null);

  const filteredMeals = useMemo(() => {
    let meals = [...menuMeals];

    if (activeCategory !== 'All') {
      meals = meals.filter((meal) => meal.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const normalized = searchTerm.trim().toLowerCase();
      meals = meals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(normalized) ||
          meal.description.toLowerCase().includes(normalized) ||
          meal.tags.join(' ').toLowerCase().includes(normalized)
      );
    }

    if (sortBy === 'price-asc') {
      meals.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      meals.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      meals.sort((a, b) => b.rating - a.rating);
    } else {
      meals.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return meals;
  }, [activeCategory, searchTerm, sortBy]);

  const setQuantity = (id, quantity) => {
    setQuantities((previous) => ({ ...previous, [id]: quantity }));
  };

  const addWithQuantity = (meal) => {
    const quantity = quantities[meal.id] || 1;
    addToCart(meal, quantity);
  };

  const relatedMeals = useMemo(() => {
    if (!activeMeal) {
      return [];
    }
    return menuMeals.filter((meal) => meal.category === activeMeal.category && meal.id !== activeMeal.id).slice(0, 3);
  }, [activeMeal]);

  return (
    <div className="menu-page">
      <PageHeader
        title="Our Menu"
        subtitle="Explore premium burgers, combos, sides, desserts, and handcrafted drinks."
      />

      <section className="menu-page-section">
        <Container>
          <Reveal>
            <SectionTitle title="Browse Menu" subtitle="Filter by category, search your favorites, and customize quantities." />
          </Reveal>

          <Reveal>
            <div className="menu-controls">
              <input
                type="search"
                className="menu-search"
                placeholder="Search meals, tags, or ingredients"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search meals"
              />
              <select
                className="menu-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort meals"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
              </select>
              <div className="category-pills" role="tablist" aria-label="Meal categories">
                {mealCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    className={activeCategory === category ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {filteredMeals.length === 0 ? (
            <div className="menu-empty">
              <EmptyState
                title="No meals found"
                description="Try adjusting your search or category filters to explore more options."
              />
            </div>
          ) : (
            <div className="menu-grid" role="list" aria-label="Menu meals">
              {filteredMeals.map((meal, index) => (
                <Reveal key={meal.id} delay={index * 0.03} as={motion.article} role="listitem">
                  <motion.article className="menu-card" whileHover={{ y: -6 }}>
                    <img src={meal.image} alt={meal.name} className="menu-card-image" loading="lazy" />
                    <div className="menu-card-body">
                      <div className="menu-card-footer">
                        <h3>{meal.name}</h3>
                        <span className="menu-price">{formatCurrency(meal.price)}</span>
                      </div>
                      <p>{meal.description}</p>
                      <div className="menu-meta">
                        <RatingStars rating={meal.rating} />
                        <span>{meal.prepTime}</span>
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div className="menu-tags">
                        {meal.tags.map((tag) => (
                          <span className="menu-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="menu-actions">
                        <QuantitySelector
                          value={quantities[meal.id] || 1}
                          onChange={(value) => setQuantity(meal.id, value)}
                          label={`Quantity for ${meal.name}`}
                        />
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <Button type="button" variant="ghost" onClick={() => toggleWishlist(meal)}>
                            {isInWishlist(meal.id) ? 'Saved' : 'Wishlist'}
                          </Button>
                          <Button type="button" onClick={() => addWithQuantity(meal)}>Add to Cart</Button>
                        </div>
                      </div>
                      <button type="button" className="quick-view-btn" onClick={() => setActiveMeal(meal)}>
                        Quick View
                      </button>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Modal isOpen={Boolean(activeMeal)} onClose={() => setActiveMeal(null)} title={activeMeal?.name || 'Meal Details'}>
        {activeMeal ? (
          <div>
            <div className="quick-modal">
              <img src={activeMeal.image} alt={activeMeal.name} loading="lazy" />
              <div>
                <div className="menu-card-footer">
                  <strong className="menu-price">{formatCurrency(activeMeal.price)}</strong>
                  <RatingStars rating={activeMeal.rating} />
                </div>
                <p style={{ marginTop: '12px', lineHeight: 1.7 }}>{activeMeal.description}</p>
                <p style={{ marginTop: '8px', color: '#666' }}>
                  Prep time: {activeMeal.prepTime} | Calories: {activeMeal.calories} kcal
                </p>
                <div className="menu-tags" style={{ marginTop: '12px' }}>
                  {activeMeal.tags.map((tag) => (
                    <span className="menu-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Button type="button" onClick={() => addWithQuantity(activeMeal)}>Add to Cart</Button>
                </div>
              </div>
            </div>

            <div className="related-meals">
              <h4>Related Meals</h4>
              <ul>
                {relatedMeals.map((meal) => (
                  <li key={meal.id}>
                    <span>{meal.name}</span>
                    <span>{formatCurrency(meal.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default MenuPage;
