import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../Styles/ModalMUI.module.css';

export default function ModalMUI(props) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.background}
                open={props.open}
                onClose={() => props.setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open} style={{ outline: 'none' }}>
                    <div className={styles.modal}>{props.children} </div>
                </Fade>
            </Modal>
        </div>
    );
}
