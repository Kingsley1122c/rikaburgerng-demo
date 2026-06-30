import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import Container from './common/Container';
import { ROUTES } from '../constants/routes';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Container className="header-container">
        <Link to={ROUTES.HOME} className="logo" aria-label="RikaburgerNG Home">
          RikaburgerNG
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to={ROUTES.HOME} end>Home</NavLink>
          <NavLink to={ROUTES.MENU}>Menu</NavLink>
          <NavLink to={ROUTES.GALLERY}>Gallery</NavLink>
          <NavLink to={ROUTES.ABOUT}>About</NavLink>
          <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
        </nav>
        <div className="header-actions">
          <NavLink to={ROUTES.CART} className="header-icon" aria-label="View cart">
            <FiShoppingBag />
            {totalItems > 0 ? <span className="cart-badge">{totalItems}</span> : null}
          </NavLink>
          <NavLink to={ROUTES.ACCOUNT} className="header-icon" aria-label="My account">
            <FiUser />
          </NavLink>
        </div>
      </Container>
    </header>
  );
};

export default Header;
