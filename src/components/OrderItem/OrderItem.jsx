import React from 'react';
import './OrderItem.css';

const OrderItem = ({ order, onEditOrder, onFinishOrder, orderIndex }) => {
  return (
    <li>
      <strong>Order for {order.customerName}</strong>
      {order.pizzas.length > 0 ? (
        <ul>
          {order.pizzas.map((pizza, pizzaIndex) => (
            <li key={pizzaIndex} style={{ marginBottom: '10px' }}>
              <div>
                <strong>{pizza.size} pizza </strong>
                {pizza.toppings.length > 0 ? (
                  <div>
                    <span>Toppings:</span>
                    <ul style={{ listStyleType: 'none', padding: '0' }}> {/* Remove bullet points */}
                      {pizza.toppings.map((topping, toppingIndex) => (
                        <li key={toppingIndex} style={{ display: 'inline', marginRight: '10px' }}>
                          {topping}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span>No toppings</span>
                )}
                <button onClick={() => onEditOrder(orderIndex, pizzaIndex)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>No pizzas in this order.</span>
      )}
      <button onClick={() => onFinishOrder(orderIndex)}>Finish Order</button>
    </li>
  );
};

export default OrderItem;
