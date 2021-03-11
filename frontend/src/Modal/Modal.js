import ReactDOM from 'react-dom';
import styles from '../Styles/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCancel, dismissOnClickOutside, style, children }) => {
    return ReactDOM.createPortal(
        <div
            className={styles.modalContainer}
            onClick={(e) => {
                if (
                    dismissOnClickOutside &&
                    e.target.parentElement === modalRoot
                ) {
                    onCancel();
                }
            }}
        >
            <div className={style}>{children}</div>
        </div>,
        modalRoot
    );
};

export default Modal;
