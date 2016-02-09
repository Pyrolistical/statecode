import React from 'react';
import ReactDOM from 'react-dom';

const Count = ({value}) =>
  <h1>{value}</h1>;

const IncrementButton = ({onClick}) =>
  <button onClick={onClick}>Increment</button>;

let value = 0;
function increment() {
  value += 1;
  render();
}

function render() {
  ReactDOM.render(<div>
    <Count value={value}/>
    <IncrementButton onClick={increment}/>
  </div>, document.getElementById('main'));
}

render();
