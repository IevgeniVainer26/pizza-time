// src/pages/customer/OrderPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

function OrderPage() {
  const [customerName, setCustomerName] = useState('');
  const [orders, setOrders] = useState([]);
  const [isNameLocked, setIsNameLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);

    if (storedOrders.length > 0) {
      setCustomerName(storedOrders[0].customerName);
      setIsNameLocked(true);
    }
  }, []);

  const handleAddOrder = () => {
    if (!customerName) {
      alert('Please enter a customer name');
      return;
    }

    const existingOrder = orders.find(order => order.customerName === customerName);

    if (!existingOrder) {
      const newOrder = {
        customerName: customerName,
        pizzas: [],
      };
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }

    setIsNameLocked(true);
    navigate('/edit-pizza', { state: { customerName } });
  };

  const handleEditOrder = (orderIndex, pizzaIndex) => {
    const order = orders[orderIndex];
    navigate('/edit-pizza', { state: { customerName: order.customerName, pizzaIndex } });
  };

  const handleFinishOrder = () => {
    const order = orders.find(order => order.customerName === customerName);
    const managerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    managerOrders.push(order);
    localStorage.setItem('managerOrders', JSON.stringify(managerOrders));
    
    const updatedOrders = orders.filter(order => order.customerName !== customerName);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    setCustomerName('');
    setIsNameLocked(false);
  };

  return (
    <div className="order-page"> {/* Use order-page class for styling */}
      <h2>Customer Orders</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) => {
            if (!isNameLocked) {
              setCustomerName(e.target.value);
            }
          }} 
          readOnly={isNameLocked}
        />
        <button onClick={handleAddOrder}>Add New Pizza</button>
      </div>
      <h3>Pizzas:</h3>
      <ul>
        {orders.map((order, orderIndex) => (
          order.pizzas.map((pizza, pizzaIndex) => (
            <li key={`${orderIndex}-${pizzaIndex}`}>
              {pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}
              <button onClick={() => handleEditOrder(orderIndex, pizzaIndex)}>Edit</button>
            </li>
          ))
        ))}
      </ul>
      {isNameLocked && (
        <button onClick={handleFinishOrder}>Finish Order</button>
      )}
    </div>
  );
}

export default OrderPage;
