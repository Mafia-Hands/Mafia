import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import styles from '../Styles/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ dismissOnClickOutside, style, children }) => {

    const history = useHistory();
    return ReactDOM.createPortal(
        <div className={styles.modalContainer} onClick={e => {
            if (dismissOnClickOutside && e.target.parentElement === modalRoot) {
                history.goBack();
            }
        }}>
            <div className={style}>
                {children}
            </div>
        </div>
        , modalRoot
    );
}

export default Modal;
