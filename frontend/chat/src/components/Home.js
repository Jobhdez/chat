import React, { useState, useEffect} from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';




function Home() {

    const [login, setLogin] = useState(false);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('philosophy');

    const client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + room + '/')

    const onButtonClicked = (e) => {
        client.send(JSON.stringify({
            type: "message",
            message: value,
            name: name
        }));
        setValue('')
        e.preventDefault();

    }
   
    useEffect(() => {
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setMessages(() => [...messages, {
                msg: dataFromServer.message,
                name: dataFromServer.name,}])
        }
    }, [client]);

    console.log(messages);
    return(
        <Container component="main" maxWidth="xs">
            {login ? 
              <div style={{marginTop: 50,}}>
                  Room Name: {room}
                  <Paper style={{height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none',}}>
                      {messages.map(message => <>
                         <Card>
                             <CardHeader title={message.name}
                                         subheader={message.msg}
                                         />
                         </Card>
                      </>)}
                  </Paper>
                  
                      <TextField
                         id="outlined-helperText"
                         label="Make a comment"
                         variant="outlined"
                         value={value}
                         fullWidth
                         onChange={e => {
                             setValue(e.target.value)
                             
                         }}
                         />
                         <Button 
                           type="submit"
                           fullWidth
                           variant="contained"
                           color="primary"
                           onClick={onButtonClicked}
                           >
                               Start Chatting
                           </Button>
                           
                
              </div>
              :
              <Box 
           component="form"
           sx={{
               '& .MuiTextField-root': {m: 1, width: '25ch'},
           }}
           noValidate
           autoComplete="off"
           >
               <div>
                   <Typography component="h1" variant="h5">
                       Meaningful Chat
                   </Typography>
                  
                   <TextField
                     required
                     id="email"
                     label="Chatroom"
                     value={room}
                     onChange={e => {
                         setRoom(e.target.value);
                         
                     }}
                     />
                     <TextField
                       required
                       id="username"
                       label="username"
                       value={name}
                       onChange={e => {
                           setName(e.target.value)
                           
                       }}
                       />
                       <Button 
                           type="submit"
                           fullWidth
                           variant="contained"
                           color="primary"
                           onClick={() => setLogin(true)}
                           >
                               Start Chatting
                           </Button>
               </div>
           </Box>}
           
              
        </Container>
         
    );
}

export default Home;