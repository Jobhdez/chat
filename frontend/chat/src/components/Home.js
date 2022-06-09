import React, { useState, useEffect} from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';



function Home() {

    const [login, setLogin] = useState('false');
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('philosophy');

    const client = new WebSocket('ws://')


    return(
         
    );
}

export default Home;