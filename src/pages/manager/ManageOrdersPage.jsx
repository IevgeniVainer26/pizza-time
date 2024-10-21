// src/pages/manager/ManageOrdersPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageOrdersPage.css'; // Import your CSS file

function ManageOrdersPage() {
  const [managerOrders, setManagerOrders] = useState([]);
  const navigate = useNavigate();

  // Load manager orders from localStorage when the component mounts
  useEffect(() => {
    const loadManagerOrders = () => {
      const storedManagerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
      setManagerOrders(storedManagerOrders);
    };

    // Load orders initially
    loadManagerOrders();

    // Set up an event listener for storage events
    window.addEventListener('storage', loadManagerOrders);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', loadManagerOrders);
    };
  }, []);

  const handleViewOrder = (index) => {
    navigate(`/order-view/${index}`); // Navigate to OrderViewPage with order index
  };

  return (
    <div className="manage-orders-page">
      <h2>Manager Orders</h2>
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
