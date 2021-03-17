export const nightTimeStatus = {
    mafia: 'Choose a player to kill',
    detective: 'Choose a player to suspect',
    medic: 'Choose a player to save',
    civilian: 'Time to sleep...',
};

export const constructPlayersOnTrialStatus = (playersOnTrial) =>
    playersOnTrial.reduce((str, p, idx, arr) => {
        if (idx === arr.length - 1) {
            str += ` and ${p} is on trial`;
        } else if (idx === 0) {
            str += p;
        } else {
            str += `, ${p}`;
        }

        return str;
    });
