const NightStateChangeEvents = require("./NightStateChangeEvents");

module.exports = function (io, socket, mafiaGame) {
  NightStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
};
