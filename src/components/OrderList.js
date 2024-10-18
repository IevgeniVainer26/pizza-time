import React from 'react';
import OrderItem from './OrderItem'; // Assuming you are using the OrderItem component

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
