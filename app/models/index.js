/**
 * @description Exports all the data_base modals to access them globally from domain Object
 * @type {Object} 
 * 
 */
const domain = {};

domain.Category = require('./category');
domain.SubCategory = require('./sub-category');

module.exports = domain;