import  React, {useState} from 'react';

const NicknameBar = () => {
    const [data, setData] = useState(null);
    const [print, setPrint] = useState(false);

    const handleText = (text) => {
        setData(text.target.value)
    }

    return (
        <div>
            {setPrint? <h1>{data}</h1> :null}
            <input type= "text" onChange = {handleText}></input>
            <button onClick ={() => setPrint(true)}> ENTER </button>
        </div>
    );
};

export default NicknameBar;