import { React, useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../Styles/RolesAndRules.module.css';
import { GameContext, GeneralContext } from '../Context';
import civilianImage from '../images/Civilian.svg';
import medicImage from '../images/Medic.svg';
import mafiaImage from '../images/Mafia.svg';
import jesterImage from '../images/Jester.svg';
import detectiveImage from '../images/Detective.svg';
import sun from '../images/Sun.svg';
import moon from '../images/Moon.svg';
import yourRole from '../images/Your Role.svg';

const useStyles = makeStyles({
    root: {
        padding: '0.5em',
        display: 'inline-table',
        height: '177px!important',
        width: '320px!important',
        overflow: 'hidden!important',
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
            image: civilianImage,
            description: {
                alignment: 'GOOD',
                powers: 'None, but they must try to vote off the Mafia members',
                winCondition: 'All Mafia members are dead',
            },
        },
        {
            name: 'Medic',
            isGood: true,
            image: medicImage,
            description: {
                alignment: 'GOOD',
                powers: 'Can save one person every night from getting killed by Mafia',
                winCondition: 'All Mafia members are dead',
            },
        },
        {
            name: 'Detective',
            isGood: true,
            image: detectiveImage,
            description: {
                alignment: 'GOOD',
                powers: 'Suspect someone in the town and find out if they’re Mafia or not',
                winCondition: 'All Mafia members are dead',
            },
        },
        {
            name: 'Mafia',
            isGood: false,
            image: mafiaImage,
            description: {
                alignment: 'BAD',
                powers: 'Can kill one person every night',
                winCondition: 'Civilian Population matches or is less than Mafia Population',
            },
        },
        {
            name: 'Jester',
            isGood: false,
            image: jesterImage,
            description: {
                alignment: 'NEUTRAL',
                powers: 'Have no special powers, but they must convince the Town to kill them',
                winCondition: 'Get voted out by Town or killed by Mafia',
            },
        },
    ];

    const dayRulesText =
        'During Day, the actions of the previous night get revealed. Then, the Town must choose someone to Eliminate;' +
        ' they are trying to get rid of the Mafia, but the Mafia can lead them astray by casting suspicion elsewhere.' +
        ' When a player gets a majority of the votes, they are eliminated. and it becomes Night.';

    const nightRulesText =
        'During Night, the roles get to perform their actions. Mafia members can decide which Town member to kill.' +
        ' Medics can try to guess who will be killed and save them. Detectives can find out if a Town member is Mafia or not.' +
        ' Once all actions have been completed, the night will be over.';

    const generalRule =
        'The Day and Night cycle repeats until the Town or Mafia win the game. ' +
        'If the Jester ever dies, they win and the game ends.';
    return (
        <div className={styles.pageContainer}>
            <div className={styles.roleContainer}>
                {roles.map((role) => (
                    <div className={styles.roleInfo} key={role.name}>
                        <div>
                            {role.name.toLowerCase() === userRole.toLowerCase() && (
                                <img src={yourRole} alt="" className={styles.roleTag} />
                            )}
                        </div>
                        <Paper
                            elevation={4}
                            className={`${classes.root} ${
                                role.name === 'Jester' ? classes.jester : role.isGood ? classes.good : classes.bad
                            }`}
                        >
                            <img src={role.image} alt="" className={styles.charaImg} />
                            <div className={styles.detail}>
                                <h2>{role.name}</h2>
                                <span className={styles.spanTitle}>Alignment: </span>
                                <span className={styles.spanContent}>{role.description.alignment}</span>
                                <br />
                                <span className={styles.spanTitle}>Powers: </span>
                                <span className={styles.spanContent}>{role.description.powers}</span>
                                <br />
                                <span className={styles.spanTitle}>Win Condition: </span>
                                <span className={styles.spanContent}>{role.description.winCondition}</span>
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2em' }}>
                <Paper elevation={4} className={styles.dayRuleContainer}>
                    <img src={sun} alt="" className={styles.ruleImg} />
                    <p className={styles.ruleDetail}>{dayRulesText}</p>
                </Paper>
                <Paper elevation={4} className={styles.nightRuleContainer}>
                    <img src={moon} alt="" className={styles.ruleImg} />
                    <p className={styles.ruleDetail}>{nightRulesText}</p>
                </Paper>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{generalRule}</p>
                </div>
            </div>
        </div>
    );
};

export default RolesAndRules;
