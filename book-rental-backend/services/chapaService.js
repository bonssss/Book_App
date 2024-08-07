// src/services/chapaService.js

const { Chapa } = require('chapa-nodejs');

const chapa = new Chapa({
  secretKey: 'CHASECK_TEST-Qt4gK4EQClrkvDjA19HZL6ezn8tk5Sjm', // Replace with your actual Chapa secret key
});

module.exports = chapa;
