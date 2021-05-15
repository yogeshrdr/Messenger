import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
    const [input,setInput] = useState('');
    const [messages,setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() =>{
            db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
              setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
            })
    }, [] )

    useEffect(() =>{
      setUsername(prompt('please enter yout name'));
    }, [] )


    const sendMessage = (event) => {
      // all the logic to send the message goes
      event.preventDefault();
      
      db.collection('messages').add({
        message : input,
        username : username, 
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
    }

  return (
    <div className="App">
      <header className="app__header">
      <h1>Dummy Chat</h1>
      <h3>Welcome {username}</h3>
      </header>
      {/* input for the message */}
      <form className="app__form">
      <FormControl className="app__formControl ">
        <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
        <IconButton className="app__button" type="submit" onClick={sendMessage} variant="contained" color="primary" disabled={!input}> <SendIcon/> </IconButton>
      </FormControl>
      </form>
      
      <div className="app__messageContainer">
      <FlipMove>
               {
                messages.map(({ id, message }) => (
                    <Message key={id} username={username} message={message} />
                  ))
                }
      </FlipMove>
      </div>
      
    </div>
  );
}

export default App;
