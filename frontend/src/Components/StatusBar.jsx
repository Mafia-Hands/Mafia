import React from "react";
import styles from "../Styles/Statusbar.module.css";

export default function StatusBar({ text }) {
    return (
        <div>
            <h1 className={styles.heading}> {text}</h1>
        </div>
    );
}
