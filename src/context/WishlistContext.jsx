import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = 'user_wishlist_data';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => String(i.id) === String(item.id));
      if (exists) {
        return prev.filter((i) => String(i.id) !== String(item.id));
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);