import  React, {useState} from 'react';

const NicknameBar = () => {
    const [data, setData] = useState(null);
    const [print, setPrint] = useState(false);
    
    /* This is prototype of what the function should do 
    will have to replace with other functions which connect to the backend
    of the project
    */

    const saveNickName = () => { 
        setPrint(true);
    }

    const handleName = (userNickname) => {
        setData(userNickname.target.value)
        setPrint(false);
    }

    return (

        <div>
            {
                print?
                <h1>{data}</h1>
                :null
            }
            <input placeholder="Enter Nickname" type= "text" onChange = {handleName}></input>
            {data && (<button onClick={saveNickName}> ENTER </button>)}
        </div>
    );
};

export default NicknameBar; 