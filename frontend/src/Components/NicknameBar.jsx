import  React, {useState} from 'react';

const NicknameBar = () => {
    const [data, setData] = useState(null);

    const handleName = (Name) => {
        setData(Name.target.value)
    }

    return (
        <div>
            <input type= "text" onChange = {handleName}></input>
            /* supposed to save the user nickname to the database */
            {data.length > 0 && (<button> ENTER </button>)}
            /* ENTER button appear when is entered, onClick to save the 
            nickname */
        </div>
    );
};

export default NicknameBar; 