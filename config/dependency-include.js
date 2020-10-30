/**
 * @author Vinay Dagar
 * Requirement - include all the global variables and module required by the application
 * 
 */

global.Logger = require('../utilities/logger-utility');
global.Mongoose = require('mongoose');

global.MongooseConnect = require('./config')();
global.sentry = require('./sentry');
global.views = require('../app/views')

global.Validate = require('express-validation');

global.Joi = require('joi');

global.MongooseSchema = Mongoose.Schema;

global.ObjectId = Mongoose.Types.ObjectId;

global.configHolder = {};

configHolder.requireDirectory = require('../utilities/require-directory');

global.domain = require('../app/models');

configHolder.jwtUtility = require('../utilities/jwt-utility');
configHolder.encryptUtility = require('../utilities/encryption-utility')

module.exports = configHolder