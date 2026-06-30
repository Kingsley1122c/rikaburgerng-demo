import React, { createContext, useState } from 'react';

const STORAGE_KEY = 'rikaburgerng-wishlist';
const WishlistContext = createContext(null);

function readInitial() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(readInitial);

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const addToWishlist = (meal) => {
    if (items.some((item) => item.id === meal.id)) {
      return;
    }
    persist([...items, meal]);
  };

  const removeFromWishlist = (id) => {
    persist(items.filter((item) => item.id !== id));
  };

  const toggleWishlist = (meal) => {
    if (items.some((item) => item.id === meal.id)) {
      removeFromWishlist(meal.id);
      return;
    }
    addToWishlist(meal);
  };

  const isInWishlist = (id) => items.some((item) => item.id === id);

  const clearWishlist = () => persist([]);

  const value = { items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext;
