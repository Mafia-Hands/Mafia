import { React, useState } from 'react';
import TopBarGame from '../Components/TopBarGame';
import GameEnv from '../Components/GameEnv';
import Chatbox from '../Components/Chatbox';
import BottomBar from '../Components/BottomBar';
import styles from '../Styles/NewGameScreen.module.css';

// this component will be used in GamePage
export default function CoreGamePage() {
    const [messageList, setMessageList] = useState([]);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{
                flex: 10,
            }}>
                <TopBarGame showTimer showRole />
                <GameEnv />
                <BottomBar />
            </div>
            <div style={{
                flex: 3,
            }}>
                <Chatbox
                    className={styles.chatbox}
                    messageList={messageList}
                    setMessageList={(message) => {
                        setMessageList((prevList) => [...prevList, message]);
                    }}
                />
            </div>
        </div>
    );
}
