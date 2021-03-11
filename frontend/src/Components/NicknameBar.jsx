import  React, {useState} from 'react';

const NicknameBar = () => {
    const [data, setData] = useState(null);

    const handleName = (Name) => {
        setData(Name.target.value)
    }

    return (
        /* supposed to save the user nickname to the database */
        /* ENTER button appear when is entered, onClick to save the 
            nickname */
        <div>
            <input placeholder="Enter Nickname" type= "text" onChange = {handleName}></input>
            {data && (<button> ENTER </button>)}
        </div>
    );
};

export default NicknameBar; 