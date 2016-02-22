'use strict';

const Express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

module.exports = () => {
  const application = Express();
  application.disable('x-powered-by');
  application.use(bodyParser.json());
  application.use(compression());
  application.use(cors());

  return application;
};
