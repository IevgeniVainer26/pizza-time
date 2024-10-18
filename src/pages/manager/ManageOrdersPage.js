import React, { useState, useEffect } from 'react';

function ManageOrdersPage() {
  const [managerOrders, setManagerOrders] = useState([]);

  // Load manager orders from localStorage when the component mounts
  useEffect(() => {
    const storedManagerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    setManagerOrders(storedManagerOrders);
  }, []);

  return (
    <div>
      <h2>Manager Orders</h2>
      {managerOrders.length === 0 ? (
        <p>No orders to review.</p>
      ) : (
        <ul>
          {managerOrders.map((order, index) => (
            <li key={index}>
              <strong>Order for {order.customerName}</strong>
              <ul>
                {order.pizzas.map((pizza, pizzaIndex) => (
                  <li key={pizzaIndex}>
                    <span>{pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageOrdersPage;
