import React, { createContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const ACTIONS = {
  ADD: 'ADD_TO_CART',
  REMOVE: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR: 'CLEAR_CART',
};

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const { meal, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === meal.id);
      const normalizedQuantity = Math.max(1, quantity || 1);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === meal.id ? { ...item, quantity: item.quantity + normalizedQuantity } : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...meal, quantity: normalizedQuantity }],
      };
    }

    case ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case ACTIONS.CLEAR:
      return initialState;

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartTotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart: (meal, quantity = 1) => dispatch({ type: ACTIONS.ADD, payload: { meal, quantity } }),
      removeFromCart: (id) => dispatch({ type: ACTIONS.REMOVE, payload: { id } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } }),
      clearCart: () => dispatch({ type: ACTIONS.CLEAR }),
      cartTotal,
      totalItems,
    }),
    [state.items, cartTotal, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
