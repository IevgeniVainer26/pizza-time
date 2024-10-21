import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css';

const OrderList = ({ orders, onEditOrder, onFinishOrder }) => {
  return (
    <div>
      <h3>Existing Orders</h3>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order, orderIndex) => (
            <OrderItem
              key={orderIndex}
              order={order}
              onEditOrder={onEditOrder}
              onFinishOrder={onFinishOrder}
              orderIndex={orderIndex}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;