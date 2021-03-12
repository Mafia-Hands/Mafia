import { React } from 'react';
import Player from '../Components/Player';
import styles from '../Styles/EntryScreen.module.css';

const EntryScreen = ({ userName, role }) => {
    return (
        <div  className = {styles.container}>
          
          <div>{`You are a ${role}`}</div>
          <div>
          <div>
          <button className = {styles.settings}>Settings</button>
          </div>
          {userName.map((name) => {
            return <Player playerName = {name}/> 
            })}
          </div>
        </div>
      );
}

export default EntryScreen;