import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/customer/OrderPage';
import PizzaEditPage from './pages/customer/PizzaEditPage';
import ManageOrdersPage from './pages/manager/ManageOrdersPage';
import OrderViewPage from './pages/manager/OrderViewPage'; // Import the new OrderViewPage
import './App.css';

function App() {
  return (
    <Router>
      <div className="App-header"> {/* Add a header div */}
        <img src="/assets/pizzaicon.png" alt="Logo" className="App-logo" /> {/* Logo Image */}
      </div>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/edit-pizza" element={<PizzaEditPage />} />
        <Route path="/manage-orders" element={<ManageOrdersPage />} />
        <Route path="/order-view/:id" element={<OrderViewPage />} /> {/* Add new route for order view */}
      </Routes>
    </Router>
  );
}

export default App;
