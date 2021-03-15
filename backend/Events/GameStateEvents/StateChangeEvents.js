const NightStateChangeEvents = require("./NightStateChangeEvents");

module.exports = function (io, socket, mafiaGame) {
  NightStateChangeEvents(io, socket, mafiaGame);
};
