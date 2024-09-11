import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartContextType, roomCriteria } from '../Types/app';


const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
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
