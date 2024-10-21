import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderList from '../../components/OrderList/OrderList';

function OrderPage() {
  const [customerName, setCustomerName] = useState(''); // State for the customer name
  const [orders, setOrders] = useState([]); // State for storing orders
  const [isNameLocked, setIsNameLocked] = useState(false); // State for locking the name input
  const navigate = useNavigate(); // Navigation hook

  // Load existing customer orders from localStorage when the component mounts
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    console.log('Loaded orders from localStorage:', storedOrders); // Log loaded orders

    // Set the customer name if an order exists
    if (storedOrders.length > 0) {
      setCustomerName(storedOrders[0].customerName); // Maintain name if orders exist
      setIsNameLocked(true); // Lock input if there are existing orders
    }
  }, []);

  const handleAddOrder = () => {
    if (!customerName) {
      alert('Please enter a customer name'); // Alert if no name is entered
      return;
    }

    // Check if the order for this customer already exists
    const existingOrder = orders.find(order => order.customerName === customerName);

    if (!existingOrder) {
      // Create a new order if one doesn't exist
      const newOrder = {
        customerName: customerName,
        pizzas: [],
      };
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Save to localStorage
      console.log('OrderPage: Created new order for customer:', customerName); // Debug statement
    } else {
      console.log('Order already exists for customer:', customerName);
    }

    // Lock the input field to prevent changes
    setIsNameLocked(true); // Lock the input
    console.log('Input locked:', true); // Log after locking

    // Navigate to the Pizza Edit Page with the customer name
    navigate('/edit-pizza', { state: { customerName } });
  };

  const handleEditOrder = (orderIndex, pizzaIndex) => {
    const order = orders[orderIndex];
    navigate('/edit-pizza', { state: { customerName: order.customerName, pizzaIndex } });
  };

  const handleFinishOrder = (orderIndex) => {
    const order = orders[orderIndex];
  
    // Move the order to the manager's list
    const managerOrders = JSON.parse(localStorage.getItem('managerOrders')) || [];
    managerOrders.push(order);
    localStorage.setItem('managerOrders', JSON.stringify(managerOrders));
  
    // Remove the finished order from the list and update localStorage
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Update localStorage
  
    // Clear the customer name and unlock the input field after finishing the order
    setCustomerName(''); // Clear customer name after the order is finished
    setIsNameLocked(false); // Unlock the input
    console.log('Input unlocked:', false); // Log after unlocking
  };
  

  return (
    <div>
      <h2>Customer Orders</h2>
      <div>
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
        <button onClick={handleAddOrder}>Add New Order</button>
      </div>
      <OrderList orders={orders} onEditOrder={handleEditOrder} onFinishOrder={handleFinishOrder} />
    </div>
  );
}

export default OrderPage;
