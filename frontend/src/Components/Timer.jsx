import * as React from "react";

const Timer = (props) => {
  let userPreferTime = props.userPreferTime;
  let startTime = parseInt(userPreferTime,10);
  let startMinute = parseInt(startTime / 60,10);
  let startSecond = startTime % 60;

  const [second, setSecond] = React.useState(startSecond.toString());
  const [minute, setMinute] = React.useState(startMinute.toString());
  const [counter, setCounter] = React.useState(startTime);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (isActive && counter > 0) {
      const secondCounter = counter % 60;
      const minuteCounter = parseInt(counter / 60,10);

      const strSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      const strMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;

      setSecond(strSecond);
      setMinute(strMinute);
      setTimeout(() => setCounter((counter) => counter - 1), 1000);
    }
  }, [isActive, counter]);

  return (
    <React.Fragment>
      <div className="time">
        <span>Timer: </span>
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
    </React.Fragment>
  );
};

export default Timer;
