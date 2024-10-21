import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/edit" element={<PizzaEditPage />} />
        <Route path="/manage" element={<ManageOrdersPage />} />
        <Route path="/view/:id" element={<OrderViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;