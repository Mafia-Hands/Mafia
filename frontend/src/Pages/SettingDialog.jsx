import { React, useState } from 'react';
import { Slider, Button, withStyles } from '@material-ui/core';
import styles from '../Styles/SettingDialog.module.css';

/* eslint-disable */
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;
    return '#' + r + g + b;
}
/* eslint-enable */

export default function SettingDialog() {
    const StyledButton = withStyles({
        root: {
            alignSelf: 'start',
            height: '100%',
            borderRadius: '10px',
            backgroundColor: '#F76C6C',
            '&:hover': {
                backgroundColor: '#f75252',
            },
        },
        label: {
            textTransform: 'capitalize',
            letterSpacing: '2px',
            fontSize: '1.2rem',
            color: 'white',
        },
    })(Button);

    // Brightness control logic
    const currentBrightness =
        parseInt(document.getElementById('brightness').style.background.substring(4, 7), 10) - 155;

    const [brightnessValue, setBrightnessValue] = useState(currentBrightness);

    const handleBrightnessChange = (event, newValue) => {
        setBrightnessValue(newValue);
        document.getElementById('brightness').style.background = RGBToHex(
            newValue + 155,
            newValue + 155,
            newValue + 155
        );
    };

    // Volume control logic
    const [bgmVolume, setBgmVolume] = useState(document.getElementById('bgm').volume * 100);

    const handleBgmVolumeChange = (event, newValue) => {
        setBgmVolume(newValue);
        document.getElementById('bgm').volume = newValue / 100.0;
    };

    return (
        <div className={styles.container}>
            <div>
                <b> Sounds </b>
                <Slider defaultValue={100} value={bgmVolume} onChange={handleBgmVolumeChange} />
            </div>
            <div>
                <b> Brightness </b>
                <Slider defaultValue={currentBrightness} value={brightnessValue} onChange={handleBrightnessChange} />
            </div>
            <div>
                <StyledButton
                    variant="contained"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Leave Game
                </StyledButton>
            </div>
        </div>
    );
}
