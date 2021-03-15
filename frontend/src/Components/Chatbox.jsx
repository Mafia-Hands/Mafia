import { React } from 'react';
import styles from '../Styles/Chatbox.module.css';

/**
 * @param messageList MANDATORY prop: a list of strings (previous chat messages)
 */
const Chatbox = ({ messageList }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.chatboxHeader}>Chat</h3>
            <ul className={styles.messageList}>
                {messageList.map((messageList, index) => (
                    <li key={index}>{messageList}</li>
                ))}
            </ul>
            <div className={styles.chatInputContainer}>
                <input className={styles.chatInput} type="text" placeholder="Chat Here..." />
                <button className={styles.rolesButton} onClick={() => alert('Chat function not implemented yet')}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbox;
