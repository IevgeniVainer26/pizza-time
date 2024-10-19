import React, { useState, useEffect } from 'react';
import './PizzaForm.css';

const PizzaForm = ({ onSave, initialPizza, onBack }) => { // Added onBack prop
  const [size, setSize] = useState(initialPizza?.size || 'Medium');
  const [toppings, setToppings] = useState(initialPizza?.toppings || []);

  useEffect(() => {
    if (initialPizza) {
      setSize(initialPizza.size);
      setToppings(initialPizza.toppings);
    }
  }, [initialPizza]);

  const handleSave = () => {
    const newPizza = { size, toppings };
    console.log('Saving pizza with details:', newPizza); // Log the new pizza details
    onSave(newPizza); // Call the provided save function
  };

  return (
    <div>
      <label>
        Pizza Size:
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>
      <div>
        <h3>Toppings:</h3>
        <label>
          <input
            type="checkbox"
            checked={toppings.includes('Cheese')}
            onChange={(e) => {
              if (e.target.checked) {
                setToppings(prev => [...prev, 'Cheese']);
              } else {
                setToppings(prev => prev.filter(topping => topping !== 'Cheese'));
              }
            }}
          />
          Cheese
        </label>
        <label>
          <input
            type="checkbox"
            checked={toppings.includes('Pepperoni')}
            onChange={(e) => {
              if (e.target.checked) {
                setToppings(prev => [...prev, 'Pepperoni']);
              } else {
                setToppings(prev => prev.filter(topping => topping !== 'Pepperoni'));
              }
            }}
          />
          Pepperoni
        </label>
        {/* Add more toppings as needed */}
      </div>
      <button onClick={handleSave}>Save Pizza</button>
      <button onClick={onBack} style={{ marginLeft: '10px' }}>Back</button> {/* Use onBack prop for back navigation */}
    </div>
  );
};

export default PizzaForm;
