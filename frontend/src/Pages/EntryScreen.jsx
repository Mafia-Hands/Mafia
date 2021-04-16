import { React, useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopBarSettings from '../Components/TopBarSettings';
import { GeneralContext } from '../Context';
import civilianImage from '../images/Civilian.svg';
import medicImage from '../images/Medic.svg';
import mafiaImage from '../images/Mafia.svg';
import jesterImage from '../images/Jester.svg';
import detectiveImage from '../images/Detective.svg';
import styles from '../Styles/EntryScreen.module.css';

const useStyles = makeStyles({
    root: {
        margin: '0 auto!important',        
    },
    good: { backgroundColor: 'palegreen' },
    bad: { backgroundColor: 'lightcoral' },
    jester: { backgroundColor: 'gold' },
});


const EntryScreen = () => {
    // get the current lobby state
    const { state: generalState } = useContext(GeneralContext);

    const propBack = { backgroundColor: null };

    const classes = useStyles(propBack);

    // TODO: Refactor this... shouldn't be copied from RolesAndRules.jsx
    const roles = [
        {
            name: 'Civilian',
            isGood: true,
            image: civilianImage,
            description:{
                alignment: 'GOOD',
                powers: 'None, but they must try to vote off the Mafia members',
                winCondition: 'All Mafia members are dead',
            },
        },
        {
            name: 'Medic',
            isGood: true,
            image: medicImage,
            description:{
                alignment: 'GOOD',
                powers: 'Can save one person every night from getting killed by Mafia',
                winCondition: 'All Mafia members are dead',
            },
        },
        {
            name: 'Detective',
            isGood: true,
            image: detectiveImage,
            description:{
                alignment: 'GOOD',
                powers: 'Suspect someone in the town and find out if they’re Mafia or not',
                winCondition: 'All Mafia members are dead',
            }
        },
        {
            name: 'Mafia',
            isGood: false,
            image: mafiaImage,
            description:{
                alignment: 'BAD',
                powers: 'Can kill one person every night',
                winCondition: 'Civilian Population matches or is less than Mafia Population',
            }
        },
        {
            name: 'Jester',
            isGood: false,
            image: jesterImage,
            description:{
                alignment: 'NEUTRAL',
                powers: 'Have no special powers, but they must convince the Town to kill them',
                winCondition: 'Get voted out by Town or killed by Mafia',
            }
        },
    ];

    // used for the fade-in animation
    const props = useSpring({
        duration: 2000,
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 300,
        reset: true,
    });

    const role = roles.find(ele => ele.name.toLowerCase() === generalState.role);

    return (
        <div style={{backgroundColor: '#C8D3D5', height: '100%'}}>
            <animated.div style={props}>
                <TopBarSettings currentScreen={`You are a ${generalState.role}`} />
                        <div className={styles.roleInfo} key={role.name}>
                            <Paper
                                elevation={4}
                                className={`${classes.root} ${
                                    role.name === 'Jester' ? classes.jester : role.isGood ? classes.good : classes.bad
                                }`}
                            >
                                <img src={role.image} alt="" className={styles.charaImg} />
                                <div className={styles.detail}>
                                    <h2>{role.name}</h2>
                                    <span className={styles.spanTitle}>Alignment: </span><span className={styles.spanContent}>{role.description.alignment}</span>
                                    <br />
                                    <span className={styles.spanTitle}>Powers: </span><span className={styles.spanContent}>{role.description.powers}</span>
                                    <br />
                                    <span className={styles.spanTitle}>Win Condition: </span><span className={styles.spanContent}>{role.description.winCondition}</span>
                                </div>
                            </Paper>
                        </div>
            </animated.div>
        </div>
    );
};

export default EntryScreen;
