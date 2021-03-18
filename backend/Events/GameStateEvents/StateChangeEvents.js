const NightStateChangeEvents = require('./NightStateChangeEvents');
const DayStateChangeEvents = require('./DayStateChangeEvents');
const TrialStateChangeEvents = require('./TrialStateChangeEvents');

module.exports = function (io, socket, mafiaGame) {
    NightStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
    DayStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
    TrialStateChangeEvents.eventHandlersRegistration(io, socket, mafiaGame);
};
