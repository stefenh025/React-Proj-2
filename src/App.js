import React from 'react';
import Calculator from './Main Layout/calculator.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Probability Calculator</h1>
      </header>
      <Calculator />
    </div>
  );
}
// To do list:
// Add Validation
// Fix Render for Pie Chart
export default App;
