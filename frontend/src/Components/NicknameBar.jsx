import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const NicknameBar = () => {
    const [data, setData] = useState(null);
    const [print, setPrint] = useState(false);

    /* This is prototype of what the function should do 
    will have to replace with other functions which connect to the backend
    of the project
    */

    const saveNickName = () => {
        setPrint(true);
    };

    const handleName = (userNickname) => {
        setData(userNickname.target.value);
        setPrint(false);
    };

    return (
        <div>
            {print ? <h1>{data}</h1> : null}
            <TextField
                color="secondary"
                id="userNickName"
                label="Enter Nickname"
                variant="outlined"
                onChange={handleName}
            />
            {data && (
                <IconButton color="inherit" onClick={saveNickName}>
                    {' '}
                    <SendIcon />{' '}
                </IconButton>
            )}
        </div>
    );
};

export default NicknameBar;
