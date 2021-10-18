import React,{useEffect, useState} from 'react'
import { Socket } from 'socket.io-client';
import * as S from './styled/App'

function App() {

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState({name: "", contents: ""})

  let ws = new WebSocket("ws://localhost:1234/ws");

  useEffect(()=>{
      ws.onopen = () => {
      console.log("connected!");
      };
  },[])

  const sendMessage = () => {  // 화살표함수로 만들것!!
    ws.send("message", comment);  // 서버로 메세지 보내는건 send
    ws.onmessage = (evt) => {
      console.log(evt);
    };
  };

  const onChange = (e) => {
    const {name, value} = e.target;
    setComment({...comment, [name]: value})
  }

  return (
    <>
      <ul>
        {item.map(
          message => {
            return(
              <S.Chat>{message}</S.Chat>   
            )
          })
        }
      </ul>
      <input name="name" onChange={(e)=>onChange(e)} value={comment.name}/>
      <input name="contents" onChange={(e)=>onChange(e)} value={comment.contents}/>
      <button onClick={() => sendMessage()}>메세지 보내기</button>
  </>
  );
}

export default App;
