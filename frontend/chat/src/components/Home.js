import React, { useState, useEffect} from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import GetInChat from './GetInChat';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';


function Home() {

    const [login, setLogin] = useState('false');
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('philosophy');

    const client = new WebSocket('ws://')

    const onButtonClicked = (e) => {
        client.send(JSON.stringfy({
            type: "message",
            message: value,
            name: name
        }));
        value = ''
        e.preventDefault();

    }

    function componentDidMount() {
        client.onopen = () => {
            console.log('Websocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer.type);
            if (dataFromServer) {
                setMessages((state) => 
                {[...state.messages,
                {
                    msg: dataFromServer.message,
                    name: dataFromServer.name,
                }]
            })

            }
        }

    }


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
                  <form noValidate onSubmit={onButtonClicked}>
                      <Textfield
                         id="outlined-helperText"
                         label="Make a comment"
                         defaultValue="default value"
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
                           >
                               Start Chatting
                           </Button>
                           
                  </form>
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
                   <form noValidate onSubmit={value => setLogin('true')}></form>
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
                           >
                               Start Chatting
                           </Button>
               </div>
           </Box>}
           
              
        </Container>
         
    );
}

export default Home;