import React, { useState } from 'react';
import Modal from '../Modal/Modal';

const Header = () => {

    const [showInfo, setShowInfo] = useState(false)

    return (
        
        <div>
           <button onClick={() => setShowInfo(true)}> 
               <i className="fa fa-info"></i>
            </button>  

            <Modal />

        </div>

        

    )
}

export default Header;
