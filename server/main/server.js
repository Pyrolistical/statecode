'use strict';

const R = require('ramda');
const reducer = require('../../reducer/main');
const Application = require('./application');
const port = process.env.PORT || 9080;

const application = Application();

let state = {
  timestamp: 0,
  value: 0
};

application.get('/state', (request, response, next) => {
  return response.send(state);
});

application.post('/events', (request, response, next) => {
  const events = request.body;
  if (R.isEmpty(events)) {
    return response.sendStatus(400, 'events cannot be empty');
  }
  state = events.reduce(reducer, state);
  const timestamp = R.last(events).timestamp;
  state.timestamp = timestamp;
  return response.send({
    timestamp
  });
});

const server = application.listen(port, () => {
  const port = server.address().port;
  console.log(`Statecode server listening on port ${port}`);
});
