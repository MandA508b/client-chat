/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
const ENDPOINT = 'https://chatserver-liga-bot.telegram-crm.work';

let socket;

const Chat = ( ) => {
  const location = useLocation()

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [access, setAccess] = useState(false)
  const [accessErr, setAccessErr] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const {advertisementId,chatId } = queryString.parse(location.search);
        const adv = await axios.post('https://liga-bot.telegram-crm.work/advertisement/findById',{advertisementId})
        //setAccessErr(JSON.stringify({chatId, res:adv.data.advertisement}, null, 4))
        if(adv.data.advertisement.statusStage === 'open') setAccess(true)
        else if(adv.data.advertisement.linkedChat === chatId) setAccess(true)
      }catch (e){
        setAccess(false)
        //setAccessErr(JSON.stringify(e, null, 4))
      }finally{
        setLoading(false)
      }
      
    }
    fetchData()
  },[])
  useEffect(() => {
      const { name, room } = queryString.parse(location.search);

    
      socket = io(ENDPOINT);

      setRoom(room);
      setName(name)

      socket.emit('join', { name, room }, (error) => {
        if(error) {
          alert(error);
        }
      });
    
    
  }, [ENDPOINT, location.search]);
  
    useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  if(loading) return (<span style={{width:'100vw', textAlign:'center'}}>????????????????...</span>)
  if(!access) return (<div className="notaccess" style={{textAlign:'center'}}>
    <h4>?? ?????? ?????????? ?????????????? ???? ?????????? ???????? :/</h4>
    <p style={{fontSize:12, fontWeight:300}}>?????? ?????? ????????????????????????/?????????????????????????? ?????????? ????????????????????????.</p>
    {
      accessErr.length ? accessErr : null
    }
    </div>)
  
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
