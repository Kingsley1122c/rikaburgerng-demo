import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/common/Reveal';
import Button from '../components/ui/Button';
import MealCard from '../components/MealCard';
import { ROUTES } from '../constants/routes';
import { menuMeals } from '../data/menuData';
import {
  whyChooseUs,
  testimonials,
  restaurantStats,
  instagramShots,
  faqPreview,
} from '../data/siteContent';
import { formatCurrency } from '../utils/formatCurrency';
import './HomePage.css';

const HomePage = () => {
  const featuredMeals = menuMeals.filter((meal) => meal.featured).slice(0, 4);
  const bestSellers = menuMeals.filter((meal) => meal.bestSeller).slice(0, 3);
  const specials = menuMeals.filter((meal) => meal.special).slice(0, 3);
  const combos = menuMeals.filter((meal) => meal.combo).slice(0, 3);

  return (
    <div className="home-page">
      <Hero />

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle
              title="Featured Meals"
              subtitle="Our chef-curated signatures crafted for premium taste and perfect balance."
            />
          </Reveal>
          <div className="home-grid" role="list" aria-label="Featured meals">
            {featuredMeals.map((meal, index) => (
              <Reveal key={meal.id} delay={index * 0.05} as={motion.article} role="listitem">
                <MealCard meal={meal} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle
              title="Best Sellers"
              subtitle="The meals our customers keep coming back for."
            />
          </Reveal>
          <div className="special-grid">
            {bestSellers.map((meal, index) => (
              <Reveal key={meal.id} delay={index * 0.06}>
                <motion.article className="special-card" whileHover={{ y: -6 }}>
                  <img src={meal.image} alt={meal.name} loading="lazy" />
                  <div className="special-card-content">
                    <span className="price-pill">{formatCurrency(meal.price)}</span>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Today's Specials" subtitle="Limited chef specials available for a short time." />
          </Reveal>
          <div className="special-grid">
            {specials.map((meal, index) => (
              <Reveal key={meal.id} delay={index * 0.06}>
                <motion.article className="special-card" whileHover={{ y: -6 }}>
                  <img src={meal.image} alt={meal.name} loading="lazy" />
                  <div className="special-card-content">
                    <span className="price-pill">{formatCurrency(meal.price)}</span>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle title="Popular Combos" subtitle="Value-packed premium combinations for sharing and celebrations." />
          </Reveal>
          <div className="combo-grid">
            {combos.map((meal, index) => (
              <Reveal key={meal.id} delay={index * 0.06}>
                <motion.article className="combo-card" whileHover={{ y: -6 }}>
                  <img src={meal.image} alt={meal.name} loading="lazy" />
                  <div className="combo-card-content">
                    <span className="price-pill">{formatCurrency(meal.price)}</span>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Why Choose Us" subtitle="A premium experience from kitchen to doorstep." />
          </Reveal>
          <div className="delivery-grid">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <motion.article className="delivery-card" whileHover={{ y: -4 }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle title="Customer Testimonials" subtitle="What our guests love most about RikaburgerNG." />
          </Reveal>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <motion.article className="testimonial-card" whileHover={{ scale: 1.01 }}>
                  <p>"{item.quote}"</p>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Delivery Information" subtitle="Fast and dependable service across Lagos." />
          </Reveal>
          <div className="delivery-grid">
            <Reveal>
              <div className="delivery-card">
                <h3>Coverage</h3>
                <p>Ikeja, Lekki, Yaba, Victoria Island, Surulere, and nearby areas.</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="delivery-card">
                <h3>Delivery Time</h3>
                <p>Average delivery window of 25 to 45 minutes depending on location.</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="delivery-card">
                <h3>Packaging</h3>
                <p>Insulated premium packaging designed to keep your meal hot and crisp.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle title="Restaurant Story" subtitle="A passion for flavor, service, and culinary excellence." />
          </Reveal>
          <div className="story-block">
            <Reveal>
              <img
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="RikaburgerNG restaurant interior"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="story-content" delay={0.06}>
              <p>
                RikaburgerNG started as a bold local kitchen with one mission: deliver world-class
                burger experiences with authentic Nigerian flair.
              </p>
              <p>
                Today, we combine premium ingredients, chef craftsmanship, and modern service to
                create memorable meals for families, professionals, and food lovers.
              </p>
              <div className="section-actions">
                <Button as={Link} to={ROUTES.ABOUT}>Read Our Story</Button>
                <Button as={Link} to={ROUTES.CONTACT} variant="ghost">Book Catering</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Our Numbers" subtitle="Built on quality and customer trust." />
          </Reveal>
          <div className="stats-grid">
            {restaurantStats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06}>
                <motion.article className="stat-card" whileHover={{ y: -4 }}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle title="Instagram Gallery" subtitle="Daily visuals from our kitchen and customer tables." />
          </Reveal>
          <div className="instagram-grid">
            {instagramShots.map((image, index) => (
              <Reveal key={image} delay={index * 0.04}>
                <motion.img src={image} alt="RikaburgerNG food highlight" loading="lazy" whileHover={{ scale: 1.03 }} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Newsletter" subtitle="Get exclusive meal drops, combo deals, and event updates first." />
          </Reveal>
          <Reveal>
            <div className="newsletter-card">
              <p>Join our VIP food list and receive premium offers weekly.</p>
              <form className="newsletter-form" onSubmit={(event) => event.preventDefault()} aria-label="Newsletter subscription form">
                <input type="email" placeholder="Enter your email" aria-label="Email address" required />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="home-section home-soft">
        <Container>
          <Reveal>
            <SectionTitle title="FAQ Preview" subtitle="Quick answers before you place your order." />
          </Reveal>
          <div className="faq-grid">
            {faqPreview.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.06}>
                <div className="faq-card">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section home-surface">
        <Container>
          <Reveal>
            <SectionTitle title="Location Preview" subtitle="Visit us for dine-in or pickup anytime." />
          </Reveal>
          <div className="location-grid">
            <Reveal>
              <div className="location-card">
                <h3>Main Branch</h3>
                <p>Placeholder address to be replaced by the client</p>
                <p>Open daily: 10:00 AM - 11:00 PM</p>
                <div className="section-actions">
                  <Button as={Link} to={ROUTES.CONTACT}>Get Directions</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="location-map">
                <div>
                  <h3>Interactive Map</h3>
                  <p>Google Maps integration placeholder for next phase launch readiness.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
