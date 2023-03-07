/* eslint-disable */

import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import './InfoBar.css';


const InfoBar = () =>{

  return(
    <div className="infoBar">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
         <span>
             ⇑потягніть вгору, щоб написати
         </span>

    </div>
);
}



export default InfoBar;