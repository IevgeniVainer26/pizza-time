import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageOrdersPage.css';

function ManageOrdersPage() {
  const [managerOrders, setManagerOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadManagerOrders = () => {
      const storedManagerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
      setManagerOrders(storedManagerOrders);
    };

    loadManagerOrders();
    window.addEventListener('storage', loadManagerOrders);

    return () => {
      window.removeEventListener('storage', loadManagerOrders);
    };
  }, []);

  const handleViewOrder = (index) => {
    navigate(`/order-view/${index}`);
  };

  return (
    <div className="manage-orders-page">
      <h2>Manage Orders</h2>
      {managerOrders.length === 0 ? (
        <p>No orders to review.</p>
      ) : (
        <ul>
          {managerOrders.map((order, index) => (
            <li key={index} onClick={() => handleViewOrder(index)}>
              <strong>Order for {order.customerName}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageOrdersPage;