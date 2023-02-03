import React, { useEffect } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import axios from 'axios'
import './InfoBar.css';
const serverURL = 'https://ligabotv2.onrender.com'

const InfoBar = ({ room }) =>{
  const [data,setData] = ('-')
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.post(`${serverURL}/advertisement/findById`,{advertisemetId:room.slice(12)})
        setData(JSON.stringify(res,null,2))
      }catch(e){
        setData(JSON.stringify(e,null,2))
      }
      
    }
    fetchData()
  },[])
  return(
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{data.length ? data : '-'}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
);
}



export default InfoBar;