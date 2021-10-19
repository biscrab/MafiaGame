import React,{useEffect, useState} from 'react'
import io from 'socket.io-client';
import * as S from '../styled/App'
import '../App.css'
const ENDPOINT = 'http://localhost:1234'
let socket

const GamePage = () => {

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState();

  let ws = new WebSocket("ws://localhost:1234/ws");
  socket = io(ENDPOINT);

  useEffect(()=>{
      ws.onopen = () => {
      console.log("connected!");
      };
  },[])

  const sendMessage = () => {  // 화살표함수로 만들것!!
    if(comment.contents&&comment.name){
      console.log(comment.contents);
      ws.send(comment.contents, setComment({...comment, contents:""}))
      document.body.scrollTop = document.body.scrollHeight;
    }
  };

  socket.on("message", (message) =>{
    setItem([...item, message]);
  });

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
      <S.IDiv>
        <input onChange={(e)=>setComment(e.target.value)} value={comment}/>
        <button onClick={() => sendMessage()}>메세지 보내기</button>
      </S.IDiv>
  </>
  );
}

export default GamePage;
