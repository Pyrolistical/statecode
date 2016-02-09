import React from 'react';
import ReactDOM from 'react-dom';

const Count = ({value}) =>
  <h1>{value}</h1>;

const IncrementButton = ({onClick}) =>
  <button onClick={onClick}>Increment</button>;

function Store() {
  if (typeof(Storage) !== "undefined") {
    return window.localStorage;
  } else {
      throw new Error('requires local storage');
  }
}

const store = Store();

let value = store.getItem('value') ? parseInt(store.getItem('value'), 10) : 0;
function increment() {
  value += 1;
  store.setItem('value', value);
  render();
}


function render() {
  ReactDOM.render(<div>
    <Count value={value}/>
    <IncrementButton onClick={increment}/>
  </div>, document.getElementById('main'));
}

render();
