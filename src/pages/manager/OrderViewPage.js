import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Load the orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders[id]; // Get the order by index

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <h2>Order Details for {order.customerName}</h2>
      <h3>Pizzas:</h3>
      <ul>
        {order.pizzas.map((pizza, index) => (
          <li key={index}>
            {pizza.size} Pizza with {pizza.toppings.join(', ')}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/manage-orders')}>Back to Manage Orders</button>
    </div>
  );
}

export default OrderViewPage;
