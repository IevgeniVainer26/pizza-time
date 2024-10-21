import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PizzaForm from '../../../components/PizzaForm/PizzaForm';
import './PizzaEditPage.css';

function PizzaEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerName, pizzaIndex } = location.state;
  const [existingPizzas, setExistingPizzas] = useState([]);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  const toppings = [
    { id: 1, name: 'Corn', image: `${process.env.PUBLIC_URL}/assets/corn.png` },
    { id: 2, name: 'Mushrooms', image: `${process.env.PUBLIC_URL}/assets/mushroom.png` },
    { id: 3, name: 'Onions', image: `${process.env.PUBLIC_URL}/assets/onion.png` },
    { id: 4, name: 'Jalapeno', image: `${process.env.PUBLIC_URL}/assets/jalapeno.png` },
    { id: 5, name: 'Pepper', image: `${process.env.PUBLIC_URL}/assets/pepper.png` },
  ];

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(order => order.customerName === customerName);

    if (order) {
      setExistingPizzas(order.pizzas || []);
    }
  }, [customerName]);

  const handleAddOrUpdatePizza = (newPizza) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(order => order.customerName === customerName);

    if (pizzaIndex !== undefined) {
      existingPizzas[pizzaIndex] = newPizza; 
    } else {
      existingPizzas.push(newPizza);
      setIsOrderCreated(true);
    }

    if (orderIndex !== -1) {
      orders[orderIndex].pizzas = existingPizzas;
      localStorage.setItem('orders', JSON.stringify(orders));
    }

    navigate('/order');
  };

  const handleBack = () => {
    if (!isOrderCreated && existingPizzas.length === 0) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const orderIndex = orders.findIndex(order => order.customerName === customerName);

      if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
      }
    }
    navigate('/order');
  };

  return (
    <div>
      <h2>{pizzaIndex !== undefined ? `Edit Pizza for ${customerName}` : `Add Pizza for ${customerName}`}</h2>
      <PizzaForm
        onSave={handleAddOrUpdatePizza}
        initialPizza={pizzaIndex !== undefined ? existingPizzas[pizzaIndex] : null}
        toppings={toppings}
        onBack={handleBack}
      />
    </div>
  );
}

export default PizzaEditPage;