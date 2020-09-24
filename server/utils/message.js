const moment = require("moment");

function messageTemplate(name, text) {
  return {
    name,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = messageTemplate;
