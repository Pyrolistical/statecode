import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SortedSet from 'collections/sorted-set';
import R from 'ramda';
import reducer from '../../reducer/main';

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

const backend = 'http://localhost:9080';

const store = Store();
let eventQueue = restoreEventQueue();

function restoreEventQueue() {
  const eventQueue = SortedSet([], Object.equals, (left, right) => Object.compare(left.timestamp, right.timestamp));
  if (store.getItem('pending events')) {
    try {
      return eventQueue.concat(JSON.parse(store.getItem('pending events')));
    } catch (error) {
      store.removeItem('pending events');
    }
  }

  return eventQueue;
}

function restoreState() {
  return axios.get(`${backend}/state`)
    .then((response) => response.data)
    .catch((error) => {
      return {
        timestamp: 0,
        value: 0
      };
    });
}

restoreState()
  .then((lastestState) => {
    let state = lastestState;
    reduce();

    function reduce() {
      const events = eventQueue.toJSON();
      store.setItem('pending events', JSON.stringify(events));
      let next;
      while (next = eventQueue.findLeastGreaterThan(state)) {
        const currentState = next.value;
        const nextState = reducer(state, currentState);
        nextState.timestamp = currentState.timestamp;
        state = nextState;
      }
      render();
      if (!R.isEmpty(events)) {
        axios.post(`${backend}/events`, events)
          .then((response) => {
            eventQueue = eventQueue.difference(eventQueue.slice(eventQueue.findLeastGreaterThan(response.data)));
            store.setItem('pending events', JSON.stringify(eventQueue.toJSON()));
          })
          .catch((error) => {
            //ignore error, will catch up later
          });
      }
    }

    function increment() {
      eventQueue.push({
        timestamp: Date.now(),
        event: 'increment'
      });
      reduce();
    }

    function render() {
      ReactDOM.render(<div>
        <Count value={state.value}/>
        <IncrementButton onClick={increment}/>
      </div>, document.getElementById('main'));
    }
  })
  .catch((error) => console.log);
