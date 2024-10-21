import React, { createContext, useState } from 'react';

export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const addPizzaToOrder = (customerName, newPizza) => {
    setOrders(prevOrders => {
      const orderIndex = prevOrders.findIndex(order => order.customerName === customerName);
      
      if (orderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex].pizzas.push(newPizza);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      } else {
        const newOrder = { customerName, pizzas: [newPizza] };
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      }
    });
  };

  const finishOrder = (orderIndex) => {
    const finishedOrder = orders[orderIndex];
    const managerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    managerOrders.push(finishedOrder);
    localStorage.setItem('managerOrders', JSON.stringify(managerOrders));
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider value={{ orders, addPizzaToOrder, finishOrder }}>
      {children}
    </OrderContext.Provider>
  );
};