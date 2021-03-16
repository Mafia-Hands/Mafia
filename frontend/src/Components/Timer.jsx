import * as React from 'react';
import styles from '../Styles/Timer.module.css';

const Timer = (props) => {
    const { userPreferTime } = props;
    const startTime = parseInt(userPreferTime, 10);
    const startMinute = parseInt(startTime / 60, 10);
    const startSecond = startTime % 60;

    const [second, setSecond] = React.useState(startSecond.toString());
    const [minute, setMinute] = React.useState(startMinute.toString());
    const [counter, setCounter] = React.useState(startTime);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        if (isActive && counter > 0) {
            const secondCounter = counter % 60;
            const minuteCounter = parseInt(counter / 60, 10);

            const strSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
            const strMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

            setSecond(strSecond);
            setMinute(strMinute);
            // eslint-disable-next-line no-shadow
            setTimeout(() => setCounter((counter) => counter - 1), 1000);
        }
    }, [isActive, counter]);

    return (
        <div>
            <div className={styles.time}>
                <span>Timer: </span>
                <span>{minute}</span>
                <span>:</span>
                <span>{second}</span>
            </div>
            <button className={styles.my_button} onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default Timer;
