import React from 'react';
//import './OrderItem.css';

const OrderItem = ({ order, onEditOrder, onFinishOrder, orderIndex }) => {
  return (
    <li>
      <strong>Order for {order.customerName}</strong>
      <ul>
        {order.pizzas.map((pizza, pizzaIndex) => (
          <li key={pizzaIndex}>
            <span>{pizza.size} pizza with {pizza.toppings.join(', ') || 'no toppings'}</span>
            <button onClick={() => onEditOrder(orderIndex, pizzaIndex)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onFinishOrder(orderIndex)}>Finish Order</button>
    </li>
  );
};

export default OrderItem;
