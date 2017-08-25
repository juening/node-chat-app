const moment = require('moment');


const generateMessage = function(from, text) {
  return {
    from: from,
    text:text,
    createdAt: moment().valueOf()
  };
}

const generateLocation = (from, latitude, longitude) => {
  return {
    from:from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
}

module.exports = {generateMessage, generateLocation};
