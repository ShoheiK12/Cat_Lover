import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // カートに商品を追加する関数
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // すでにカートにあるかチェック
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // 数量を1増やす
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // 新しく追加（数量 1）
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // カートから商品を削除する関数
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 他のコンポーネントで簡単に呼び出すためのカスタムHook
export function useCart() {
  return useContext(CartContext);
}