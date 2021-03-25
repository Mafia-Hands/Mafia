import { React, useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../Styles/RolesAndRules.module.css';
import { GameContext, GeneralContext } from '../Context';

const useStyles = makeStyles({
    root: {
        padding: '1em',
        display: 'grid',
        gridTemplateRows: '2em 1fr 0.5fr',
        alignItems: 'stretch',
        justifySelf: 'end',
    },
    good: { backgroundColor: 'palegreen' },
    bad: { backgroundColor: 'lightcoral' },
    jester: { backgroundColor: 'gold' },
});

/**
 * @param userRole Civilian/Medic/Detective/Mafia - gets user's role to display what their current role is
 */
const RolesAndRules = ({ inLobby }) => {
    const { state: gameState } = useContext(!inLobby ? GameContext : GeneralContext);
    let userRole = '';

    if (!inLobby) {
        userRole = gameState.role;
    }

    const props = { backgroundColor: null };
    const classes = useStyles(props);

    const roles = [
        {
            name: 'Civilian',
            isGood: true,
            description:
                'A GOOD member of the town. Civilians have no powers but they must try to vote off the Mafia members.',
            winCondition: 'All Mafia members are dead.',
        },
        {
            name: 'Medic',
            isGood: true,
            description:
                'A GOOD member of the town. Medics can save one person every night from getting killed by Mafia.',
            winCondition: 'All Mafia members are dead.',
        },
        {
            name: 'Detective',
            isGood: true,
            description:
                'A GOOD member of the town. Detectives can suspect someone in the town and find out if they’re Mafia or not.',
            winCondition: 'All Mafia members are dead.',
        },
        {
            name: 'Mafia',
            isGood: false,
            description: 'A BAD member of the town. Mafia can kill one person every night.',
            winCondition: 'Civilian Population matches or is less than Mafia Population.',
        },
        {
            name: 'Jester',
            isGood: false,
            description:
                'NOT a member of the town. Jesters have no special powers but they must convince the Town to kill them.',
            winCondition: 'Get voted out by Town or killed by Mafia.',
        },
    ];

    const rulesText =
        'During Day, the actions of the previous night get revealed. Then, the Town must choose someone to Eliminate;' +
        ' they are trying to get rid of the Mafia, but the Mafia can lead them astray by casting suspicion elsewhere.' +
        ' When a player gets a majority of the votes, they are eliminated. and it becomes Night.' +
        '\n\nDuring Night, the roles get to perform their actions. Mafia members can decide which Town member to kill.' +
        ' Medics can try to guess who will be killed and save them. Detectives can find out if a Town member is Mafia or not.' +
        ' Once all actions have been completed, the night will be over.' +
        '\n\nThe Day and Night cycle repeats until the Town or Mafia win the game.' +
        'If the Jester ever dies, they win and the game ends.';

    return (
        <div>
            <div className={styles.roleContainer}>
                {roles.map((role) => (
                    <div className={styles.roleInfo} key={role.name}>
                        <div>
                            {role.name.toLowerCase() === userRole.toLowerCase() && (
                                <p className={styles.roleHighlight}>This is your role!</p>
                            )}
                        </div>
                        <Paper
                            elevation={2}
                            className={`${classes.root} ${
                                role.name === 'Jester' ? classes.jester : role.isGood ? classes.good : classes.bad
                            }`}
                        >
                            <h3>{role.name}</h3>
                            <p>{role.description}</p>
                            <div>
                                <strong>Win Condition:</strong>
                                <p>{role.winCondition}</p>
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
            <div>
                <div className={styles.ruleContainer}>
                    <p>{rulesText}</p>
                </div>
            </div>
        </div>
    );
};

export default RolesAndRules;
