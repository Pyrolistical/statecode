'use strict';

module.exports = (state, action) => {
  switch (action) {
    case 'increment':
      return {
        value: state.value + 1
      };
    default:
      throw new Error(`Unsupported action ${action}`);
  }
};
