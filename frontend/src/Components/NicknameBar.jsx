import  React, {useState} from 'react';

const NicknameBar = () => {
    const [data, setData] = useState(null);
    const [print, setPrint] = useState(false);

    const handleText = (text) => {
        setData(text.target.value)
    }

    return (
        <div>
            <input type= "text" onChange = {handleText}></input>
            /* supposed to save the user nickname to the database */
            <button onClick ={() => setPrint(true)}> ENTER </button>
        </div>
    );
};

export default NicknameBar; 