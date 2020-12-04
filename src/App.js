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
// Add Notifier for NaN inputs on result box (low prior as validation works)
// Find a proper fix for rerender of pie graph
// Super(props) is deprecated, should be removed (leaving it for now)
export default App;
