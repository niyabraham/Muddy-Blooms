import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
  try {
    const saved = localStorage.getItem('muddy_cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
  });

  const getId = (plant) => plant._id || plant.id;

  const addToCart = (plant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => getId(item) === getId(plant));
      if (existing) {
        return prev.map((item) =>
          getId(item) === getId(plant)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => getId(item) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (getId(item) === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

useEffect(() => {
  localStorage.setItem('muddy_cart', JSON.stringify(cartItems));
}, [cartItems]);

export function useCart() {
  return useContext(CartContext);
}