import React, { createContext, useState } from 'react';

// Create a context for orders
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // State to hold orders

  const addPizzaToOrder = (customerName, newPizza) => {
    setOrders(prevOrders => {
      const orderIndex = prevOrders.findIndex(order => order.customerName === customerName);
      
      if (orderIndex !== -1) {
        // If the order exists, add the pizza to that order
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex].pizzas.push(newPizza);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      } else {
        // If the order doesn't exist, create a new order with the pizza
        const newOrder = { customerName, pizzas: [newPizza] };
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      }
    });
  };

  const finishOrder = (orderIndex) => {
    const finishedOrder = orders[orderIndex];

    // Move to manager's orders
    const managerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    managerOrders.push(finishedOrder);
    localStorage.setItem('managerOrders', JSON.stringify(managerOrders));

    // Remove the order from the current orders
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Update localStorage
  };

  return (
    <OrderContext.Provider value={{ orders, addPizzaToOrder, finishOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
