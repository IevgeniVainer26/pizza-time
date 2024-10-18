import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PizzaForm from '../../components/PizzaForm';

function PizzaEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerName, pizzaIndex } = location.state; // Get customer name and pizza index
  const [existingPizzas, setExistingPizzas] = useState([]);

  useEffect(() => {
    console.log('Loading pizzas for:', customerName); // Log to check customer name
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(order => order.customerName === customerName);

    if (order) {
      setExistingPizzas(order.pizzas || []); // Load existing pizzas for this order
    }
  }, [customerName]);

  const handleAddOrUpdatePizza = (newPizza) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(order => order.customerName === customerName);
    
    // Log the current pizzas before saving
    console.log('Current pizzas before saving:', existingPizzas);

    if (pizzaIndex !== undefined) {
      // If editing an existing pizza
      existingPizzas[pizzaIndex] = newPizza; // Update the existing pizza
    } else {
      // If adding a new pizza
      existingPizzas.push(newPizza);
    }

    // Update the order in localStorage
    if (orderIndex !== -1) {
      orders[orderIndex].pizzas = existingPizzas; // Update existing order with new pizzas
      localStorage.setItem('orders', JSON.stringify(orders));
      console.log('Updated pizzas in order:', orders[orderIndex].pizzas); // Log updated pizzas
    }

    // Navigate back to the Order Page to show updated list
    navigate('/'); // Ensure to navigate correctly back to the Order Page
  };

  return (
    <div>
      <h2>{pizzaIndex !== undefined ? `Edit Pizza for ${customerName}` : `Add Pizza for ${customerName}`}</h2>
      <PizzaForm onSave={handleAddOrUpdatePizza} initialPizza={pizzaIndex !== undefined ? existingPizzas[pizzaIndex] : null} />
      <h3>Current Pizzas:</h3>
      <ul>
        {existingPizzas.map((pizza, index) => (
          <li key={index}>
            {pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Finish Order</button>
    </div>
  );
}

export default PizzaEditPage;
