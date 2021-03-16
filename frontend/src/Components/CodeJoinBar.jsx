import  React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const CodeJoinBar = () => {
    const [data,setData] = useState(null);

    const handleID = (LobbyID) => {
        setData(LobbyID.target.value)
    }

    return (
        /* supposed to enter Lobby ID to join the lobby */
        /* button will have onClick to join */
        <div>
            <TextField color= "secondary" value={data} label="Enter LobbyID" variant= "outlined" type= "text" onChange = {handleID}></TextField>
            <IconButton color="inherit"> <SendIcon/> </IconButton>
        </div>
    );
};

export default CodeJoinBar; 