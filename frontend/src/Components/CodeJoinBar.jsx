import  React, {useState} from 'react';

const CodeJoinBar = () => {
    const [data,setData] = useState(null);

    const handleID = (LobbyID) => {
        setData(LobbyID.target.value)
    }

    return (
        /* supposed to enter Lobby ID to join the lobby */
        /* button will have onClick to join */
        <div>
            <input value={data} placeholder="Enter LobbyID" type= "text" onChange = {handleID}></input>
            <button> JOIN </button>
        </div>
    );
};

export default CodeJoinBar; 