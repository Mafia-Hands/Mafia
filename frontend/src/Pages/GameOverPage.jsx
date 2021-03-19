import { React, useState, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GameContext } from './GamePage';
import ModalMUI from '../Modal/ModalMUI';
import SettingDialog from '../Pages/SettingDialog';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const GameOverPage = () => {
    const { state } = useContext(GameContext);
    const [open, setOpen] = useState(false);

    return (
        <div> 
            <Grid container direction='row'>
            <Grid item xs={0} sm={2}></Grid>
            <Grid item xs={10} sm={8}><h1>{`WINNER are a ${state.winningRole}`}</h1></Grid>

            <Grid item xs={0} sm={2}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Settings
                </Button>
            </Grid>      
            
            </Grid>
            
            <div>
                {state.winners.map((name) => {
                    return <Player playerName={name} />;
                })}
            </div>

            <div>
                <ModalMUI open={open} setOpen={setOpen}>
                    <div>
                        <TopBarSettings
                            showBack={true}
                            showUp={setOpen}
                            currentScreen="SETTINGS"
                            showSettings={false}
                        />
                        <SettingDialog />
                    </div>
                </ModalMUI>
            </div>


        </div>
    );
};

export default GameOverPage;
