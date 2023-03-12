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

  useEffect(() => {
    const init = async ()=>{
      const { name, room, advertisementId,chatId } = queryString.parse(location.search);

      const adv = await axios.post('https://liga-bot.telegram-crm.work/advertisement/findById',{advertisementId})

      if(adv.advertisement.statusStage === 'open') setAccess(true)
      else 
        if(adv.advertisement.linkedChat === chatId) setAccess(true)
      
      socket = io(ENDPOINT);

      setRoom(room);
      setName(name)

      socket.emit('join', { name, room }, (error) => {
        if(error) {
          alert(error);
        }
      });
    }
    init()
    
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

  if(!access) return (<div className="notaccess" style={{textAlign:'center'}}>
    <h4>У вас немає доступу до цього чату :/</h4>
    <p style={{fontSize:12, fontWeight:300}}>цей чат зафіксований/заброньований іншим користувачем.</p>
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
