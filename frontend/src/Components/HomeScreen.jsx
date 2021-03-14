import { React, useState } from 'react';
import CodeJoinBar from '../Components/CodeJoinBar';
import ModalMUI from '../Modal/ModalMUI';
import NicknameBar from '../Components/NicknameBar';
import CreateGame from '../Components/CreateGame';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';
import { Grid, Toolbar } from '@material-ui/core';


const HomeScreen = () => {
    const [open, setOpen] = useState(false);
    
    return(
        <Grid container direction= "column" justify="space-evenly" spacing="2">
            
            <Toolbar>
                <button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Settings
                </button>
            </Toolbar>
            <Grid item><h1>MAFIA</h1></Grid>

            <div>
                <ModalMUI open={open} setOpen={setOpen}>
                    <div>
                        <TopBarSettings
                            showUp={setOpen}
                            currentScreen="HOME"
                            showSettings={false}
                    />
                    <SettingDialog />
                    </div>
                </ModalMUI>
            </div>
            <Grid item><CodeJoinBar/></Grid>
            <Grid item><NicknameBar/></Grid>
            <Grid item><CreateGame/></Grid>
        </Grid>
    );
};

export default HomeScreen;
