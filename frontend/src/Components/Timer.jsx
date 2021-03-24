import * as React from 'react';
import styles from '../Styles/Timer.module.css';

const Timer = (props) => {
    const { userPreferTime } = props;
    const startTime = userPreferTime * 0.001;
    const startMinute = parseInt(startTime / 60, 10);
    const startSecond = startTime % 60;
    const [second, setSecond] = React.useState(startSecond.toString());
    const [minute, setMinute] = React.useState(startMinute.toString());
    const [counter, setCounter] = React.useState(startTime);

    React.useEffect(() => {
        setCounter(startTime);
    }, [startTime]);

    React.useEffect(() => {
        let interval = null;
        if (counter > 0) {
            const secondCounter = counter % 60;
            const minuteCounter = parseInt(counter / 60, 10);
            const strSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
            const strMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
            setSecond(strSecond);
            setMinute(strMinute);
            interval = setInterval(() => {
                setCounter((count) => count - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (counter === 0) {
            setSecond('00');
            setMinute('00');
        }
    }, [counter]);

    return (
        <div>
            <div className={styles.time}> {`Timer: ${minute}:${second}`}</div>
        </div>
    );
};

export default Timer;
