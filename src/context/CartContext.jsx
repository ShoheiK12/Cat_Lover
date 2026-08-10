import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cat_lover_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cat_lover_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) => {
          if (cartItem.id === id) {
            const newQuantity = cartItem.quantity + delta;
            return newQuantity > 0 ? { ...cartItem, quantity: newQuantity } : cartItem;
          }
          return cartItem;
        })
    );
  };
  
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
