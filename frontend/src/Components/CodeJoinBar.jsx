import  React, {useState} from 'react';

const CodeJoinBar = () => {
    const [data, setData] = useState(null);

    const handleID = (LobbyID) => {
        setData(LobbyID.target.value)
    }

    return (
        <div>
            <input type= "text" onChange = {handleID}></input>
            /* supposed to enter Lobby ID to join the lobby */
            <button> JOIN </button>
            /* button will have onClick to join */
        </div>
    );
};

export default CodeJoinBar; 