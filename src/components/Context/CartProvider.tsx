import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartContextType, roomCriteria } from '../../Types/app';





// Create the context with an initial value
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});
// Custom hook to consume the context
export function useCart() {
  const context = useContext(CartContext);
  return context;
}

// Provider component to wrap the app with
interface CartProviderProps {
  children: ReactNode;
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<roomCriteria[]>([]);

  const addToCart = (item: roomCriteria) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.roomId !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
