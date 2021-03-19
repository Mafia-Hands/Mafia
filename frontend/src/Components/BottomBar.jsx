import { React } from 'react';
import PropTypes from 'prop-types';
// import styles from '../Styles/BottomBar.module.css';

const BottomBar = ({Period, Number}) => (
    <div>
        <h1>{`${Period} ${Number}`}</h1>
    </div>
);

export default BottomBar;

BottomBar.propTypes = {
    Period: PropTypes.string,
    Number: PropTypes.number,
};

BottomBar.defaultProps = {
    Period: null,
    Number: null,
};