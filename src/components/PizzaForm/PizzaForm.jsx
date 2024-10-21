import React, { useState, useEffect } from 'react';
import './PizzaForm.css';

function PizzaForm({ onSave, initialPizza, toppings, onBack }) {
  const [pizzaSize, setPizzaSize] = useState(initialPizza?.size || 'Medium');
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    if (initialPizza && initialPizza.toppings) {
      setSelectedToppings(initialPizza.toppings);
    }
  }, [initialPizza]);

  const handleToppingClick = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleSave = () => {
    onSave({ size: pizzaSize, toppings: selectedToppings });
  };

  return (
    <div className="pizza-form">
      <div className="form-group">
        <label htmlFor="size">Pizza Size:</label>
        <select
          id="size"
          value={pizzaSize}
          onChange={(e) => setPizzaSize(e.target.value)}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div className="toppings-container">
        {toppings.map((topping) => (
          <div
            key={topping.id}
            className={`topping ${selectedToppings.includes(topping.name) ? 'selected' : ''}`}
            onClick={() => handleToppingClick(topping.name)}
          >
            <img
              src={topping.image}
              alt={topping.name}
              className={selectedToppings.includes(topping.name) ? 'selected' : ''}
            />
            <span>{topping.name}</span>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default PizzaForm;