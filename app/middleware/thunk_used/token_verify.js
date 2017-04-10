const axios = require('axios');

const tokenVerify = function() {
  const token = localStorage.getItem('token');

  return console.log(token);
};

export default tokenVerify;
