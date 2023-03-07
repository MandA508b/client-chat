import React from 'react';

import './Input.css';
import SendIcon from './../../icons/iconsend.png'
const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Напишіть повідомлення..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}><img src={SendIcon} alt=""/></button>
  </form>
)

export default Input;