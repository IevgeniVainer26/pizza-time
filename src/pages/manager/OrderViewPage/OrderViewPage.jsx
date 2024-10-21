import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderViewPage.css';

function OrderViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    const selectedOrder = orders[id];
    setOrder(selectedOrder);
  }, [id]);

  const handleAcceptOrder = () => {
    const orders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    const updatedOrders = orders.filter((_, index) => index !== parseInt(id));
    localStorage.setItem('managerOrders', JSON.stringify(updatedOrders));
    navigate('/manage');
  };

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <h2>Order Details for {order.customerName}</h2>
      <ul>
        {order.pizzas.map((pizza, index) => (
          <li key={index}>
            {pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={handleAcceptOrder}>Accept Order</button>
        <button onClick={() => navigate('/manage')}>Back to Manage Orders</button>
      </div>
    </div>
  );
}

export default OrderViewPage;