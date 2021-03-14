import { React, useState } from 'react';
import ModalMUI from '../Modal/ModalMUI';
import NicknameBar from '../Components/NicknameBar';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import { Grid } from '@material-ui/core';


const HomeScreenID = () => {
    const [open, setOpen] = useState(false);
    
    return(
        
        <Grid container direction= "column" justify="space-evenly" spacing="2">
            <Grid item container direction="row" >
                <Grid item xs ={0} sm={2}/>
                <Grid item xs ={10} sm={8}><h1>MAFIA</h1></Grid>
                <Grid item xs ={0} sm={2}>
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <SettingsIcon/>
                    </IconButton>
                        <ModalMUI open={open} setOpen={setOpen}>
                        <TopBarSettings showUp={false} currentScreen="HOME" showSettings={false}/>
                        <SettingDialog />
                        </ModalMUI>
                </Grid>
            </Grid>
            <Grid item><NicknameBar/></Grid>
        </Grid>
    );
};

export default HomeScreenID;
