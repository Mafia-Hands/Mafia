class GameState {
    constructor() {
        this.playerState = { name: '', role: '' };

        this.gameState = {
            dayPeriod: '', // night or day
            dayNumber: 1, // what day it is
            alivePlayers: [], // what players are alive
        };

        this.votingState = {
            reason: '', // role or discussion or trial
            votablePlayers: [], // what other players can we vote for
            vote: '', // my current Vote
            playersWhoVoted: [], // other players who have voted
            killedPlayer: '', // the outcome of the vote
            timeToVote: '', // time to vote
        };
    }

    onGameStart({ role }) {
        this.playerState.role = role;
        this.screenState = 'game';
        this.gameScreenState = 'start';

        if (role === 'detective') {
            this.playerState.suspectsChecked = [];
        }
    }

    onNightStart({ playerKilled, timeToVote }) {
        this.gameState.dayPeriod = 'night';

        // first night
        if (this.gameScreenState === 'start') {
            this.gameScreenState = 'main';
            this.gameState.dayNumber = 1;
            this.gameState.alivePlayers = this.lobbyState.players;
        } else {
            this.playerKilled = playerKilled;
        }

        this.votingState.reason = 'role';
        this.votingState.timeToVote = timeToVote;
        // this.votingState.votablePlayers =
    }

    onSuspectReveal({ nickname, isMafia }) {}

    /* Client to server: No State changes until server responds */

    createLobby(nickname) {
        this.playerState.nickname = nickname;
        this.socket.emit('create-lobby', { nickname });
    }

    joinLobby(nickname, roomCode) {
        this.playerState.nickname = nickname;
        this.socket.emit('join-lobby', { nickname, roomCode });
    }

    startGame() {
        this.socket.emit('start-game');
    }

    voteFor(role, votingFor) {
        this.socket.emit(`${role}-vote`, { votingFor });
    }

    resetLobby() {
        this.socket.emit('reset-lobby');
    }
}
