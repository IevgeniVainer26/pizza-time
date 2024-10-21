import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderViewPage() {
  const { id } = useParams(); // Get the order index from the URL parameters
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // State to hold the selected order

  useEffect(() => {
    // Load the orders from localStorage
    const orders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    const selectedOrder = orders[id]; // Get the selected order by index
    setOrder(selectedOrder);
  }, [id]);

  const handleAcceptOrder = () => {
    const orders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    // Remove the order from localStorage
    const updatedOrders = orders.filter((_, index) => index !== parseInt(id));
    localStorage.setItem('managerOrders', JSON.stringify(updatedOrders)); // Update localStorage
    navigate('/manage-orders'); // Navigate back to manage orders page
  };

  if (!order) {
    return <div>Order not found.</div>; // Handle case where order is not found
  }

  return (
    <div>
      <h2>Order Details for {order.customerName}</h2>
      <h3>Pizzas:</h3>
      <ul>
        {order.pizzas.map((pizza, index) => (
          <li key={index}>
            {pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}
          </li>
        ))}
      </ul>
      <button onClick={handleAcceptOrder}>Accept Order</button>
      <button onClick={() => navigate('/manage-orders')}>Back to Manage Orders</button>
    </div>
  );
}

export default OrderViewPage;
