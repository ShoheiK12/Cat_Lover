import { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Read order history from localStorage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cat_lover_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Save order history in localStorage once order history is updated
  useEffect(() => {
    localStorage.setItem('cat_lover_orders', JSON.stringify(orders));
  }, [orders]);

  // Add order
  const addOrder = (orderData) => {
    const newOrder = {
      id: `CAT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      status: 'Processing',
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}