const userinfo = require('./script').user;
const form = document.querySelector('form');
const namein = form.querySelector('#name');
namein.value = userinfo.name;
