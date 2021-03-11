import React from 'react';

const GoBackBtn = (props) => {
    //TODO: improve css
    return <button onClick={() => props.goback(false)}> Go Back </button>;
};

export default GoBackBtn;
