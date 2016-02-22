'use strict';

module.exports = (state, event) => {
  switch (event.event) {
    case 'increment':
      return {
        value: state.value + 1
      };
    default:
      throw new Error(`Unsupported action ${event.event}`);
  }
};
