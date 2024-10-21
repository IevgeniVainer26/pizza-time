import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/customer/OrderPage/OrderPage';
import PizzaEditPage from './pages/customer/PizzaEditPage/PizzaEditPage';
import ManageOrdersPage from './pages/manager/ManageOrdersPage/ManageOrdersPage';
import OrderViewPage from './pages/manager/OrderViewPage/OrderViewPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App-header">
        <img src="/assets/pizzaicon.png" alt="Logo" className="App-logo" />
      </div>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/edit-pizza" element={<PizzaEditPage />} />
        <Route path="/manage-orders" element={<ManageOrdersPage />} />
        <Route path="/order-view/:id" element={<OrderViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
