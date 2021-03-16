import React from 'react';
import Button from '@material-ui/core/Button';
import IDGenerator from './IDGenerator';

const CreateGame = (props) => {
    return (
        /* button will have onClick to create a new Lobby */
        !props.lobbyId && (
            <div>
                <Button
                    variant="outlined"
                    onClick={() => {
                        props.setLobbyId(IDGenerator());
                        props.setAllowIn(true);
                    }}
                >
                    {' '}
                    Create Game{' '}
                </Button>
            </div>
        )
    );
};

export default CreateGame;
