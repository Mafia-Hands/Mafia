import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../Styles/ModalMUI.module.css';

/**
 * @param props [{open: <bool>, setOpen: <func>}] used to open the modal
 */
export default function ModalMUI(props) {
    const { open, setOpen, children } = props;
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.background}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} style={{ outline: 'none' }}>
                    <div className={styles.modal}> {children} </div>
                </Fade>
            </Modal>
        </div>
    );
}

ModalMUI.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    children: PropTypes.func,
};

ModalMUI.defaultProps = {
    open: false,
    setOpen: null,
    children: null,
};
