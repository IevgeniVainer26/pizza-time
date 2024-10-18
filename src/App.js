import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/customer/OrderPage';
import PizzaEditPage from './pages/customer/PizzaEditPage';
import ManageOrdersPage from './pages/manager/ManageOrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/edit-pizza" element={<PizzaEditPage />} />
        <Route path="/manage-orders" element={<ManageOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
