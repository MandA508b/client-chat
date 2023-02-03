/* eslint-disable */

import React, { useEffect, useState } from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import axios from 'axios'
import './InfoBar.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const serverURL = 'https://ligabotv2.onrender.com'

const InfoBar = ({ room }) =>{
  const [data,setData] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  useEffect(()=>{
    const fetchData = async () => {
      const { room } = queryString.parse(location.search);
      console.log(room, room.slice(0,24))
      try{
        setLoading(true)
        const { room } = queryString.parse(location.search);
        const res = await axios.post(`${serverURL}/advertisement/findById`,{advertisementId:room.slice(0,24)})
        console.log(res)
        setData(`${res.data.advertisement.type.toUpperCase()} ${res.data.advertisement.total}$ ${res.data.advertisement.rate}%`)
      }catch(e){
        setData(JSON.stringify(e,null,2))
      }finally{
        setLoading(false)
      }
      
    }
    //fetchData()
  },[])
  return(
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{data?.length ? data : '-'}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
);
}



export default InfoBar;