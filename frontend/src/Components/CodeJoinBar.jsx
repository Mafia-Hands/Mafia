import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const CodeJoinBar = (props) => {
    const [data, setData] = useState(props.lobbyId);

    const handleID = (LobbyID) => {
        setData(LobbyID.target.value);
    };

    return (
        /* supposed to enter Lobby ID to join the lobby */
        /* button will have onClick to join */
        <div>
            <TextField
                color="secondary"
                value={data}
                label={props.lobbyId ? props.lobbyId : 'Enter LobbyID'}
                variant="outlined"
                type="text"
                onChange={handleID}
            />
            <IconButton color="inherit">
                {' '}
                <SendIcon
                    onClick={() => {
                        props.setLobbyId(data);
                        props.setAllowIn(true);
                    }}
                />{' '}
            </IconButton>
        </div>
    );
};

export default CodeJoinBar;
