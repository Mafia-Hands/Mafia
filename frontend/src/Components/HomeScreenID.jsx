import { React, useState } from 'react';
import ModalMUI from '../Modal/ModalMUI';
import NicknameBar from '../Components/NicknameBar';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';
import { Grid, Toolbar } from '@material-ui/core';


const HomeScreenID = () => {
    const [open, setOpen] = useState(false);
    
    return(
        <Grid container direction= "column">
            
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
            <Grid item><NicknameBar/></Grid>
        </Grid>
    );
};

export default HomeScreenID;
