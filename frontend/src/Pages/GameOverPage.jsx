import { React, useState, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import Player from '../Components/Player';
import { GameContext } from './GamePage';
import ModalMUI from '../Modal/ModalMUI';
import SettingDialog from '../Pages/SettingDialog';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { animated, useSpring } from 'react-spring';

const GameOverPage = () => {
    const { state } = useContext(GameContext);
    const [open, setOpen] = useState(false);

    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 500,
        reset: true,
    });

    return (
        <div> 
            <animated.div style={props}>
                <Grid container direction='row' alignItems='center' justify='center'>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={10} sm={8}><h1>{`WINNER are a ${state.winningRole}`}</h1></Grid>

                <Grid item xs={2} sm={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Settings
                    </Button>
                </Grid>   
                <div>
                    {state.winners.map((name) => {
                        return <Player playerName={name} />;
                    })}
                </div>   
                
                </Grid>
                
                

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
            </animated.div>
        </div>
    );
};

export default GameOverPage;
