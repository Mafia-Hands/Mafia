import { React, useState  } from 'react';
import { Slider, Button, withStyles } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import styles from '../Styles/SettingDialog.module.css';

/* eslint-disable */
function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1)
      r = "0" + r;
    if (g.length === 1)
      g = "0" + g;
    if (b.length === 1)
      b = "0" + b;
    return "#" + r + g + b;
}
/* eslint-enable */

// TODO: implement the slider functions
export default function SettingDialog(){
    const StyledButton = withStyles({
        root: {
            alignSelf: 'start',
            height: '100%',
            borderRadius: '10px',
            backgroundColor: '#EE6644',
        },
        label: {
            textTransform: 'capitalize',
            letterSpacing: '2px',
            fontSize: '1.2rem',
            color: 'white',
        },
    })(Button);
    
    const musicSrcSet = [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://demo.twilio.com/docs/classic.mp3'
    ];

    const currentBrightness = parseInt(document.getElementById("GLBbrightness").style.background.substring(4,7), 10) - 155;

    const [value, setValue] = useState(currentBrightness);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        document.getElementById("GLBbrightness").style.background = RGBToHex(newValue+155,newValue+155,newValue+155);
        if (document.getElementById("NGSbrightness")) {document.getElementById("NGSbrightness").style.background = RGBToHex(newValue+155,newValue+155,newValue+155);}
    };

    return(
        <div className={styles.container}>
        <div>
            <div><b> Sound </b><br /><br /></div>
            <div>
                <AudioPlayer
                    elevation={0}
                    height="50px"
                    variation="primary"
                    spacing={1}
                    autoplay="autoplay"
                    debug={false}
                    loop="true"
                    src={musicSrcSet}
                    onFinished={() => {
                        //
                    }}
                />
            </div>
        </div>
        <div>
            <b> Brightness </b>
            <Slider 
                defaultValue={currentBrightness}
                value={value}
                onChange={handleChange}
            />
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
