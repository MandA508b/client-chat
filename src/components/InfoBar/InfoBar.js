/* eslint-disable */

import React, { useEffect, useState } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import axios from 'axios'
import './InfoBar.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


const InfoBar = ({ room }) =>{

  return(
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      </div>

    </div>
);
}



export default InfoBar;