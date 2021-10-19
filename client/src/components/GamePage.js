import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import * as S from '../styled/App'
const ENDPOINT = 'http://localhost:1234'
let socket

const GamePage = () => {

  let params = useParams();

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState();

  let ws = new WebSocket("ws://localhost:1234/ws");
  socket = io(ENDPOINT);

  useEffect(()=>{
      ws.onopen = () => {
      console.log("connected!");
      };

      axios.post('')
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

  const passwordBorder = () => {

  }

  return (
    <>
    <S.Game>
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
        <S.Textarea onChange={(e)=>setComment(e.target.value)} value={comment}/>
        <S.CButton onClick={() => sendMessage()}>메세지 보내기</S.CButton>
      </S.IDiv>
  </S.Game>
  </>
  );
}

export default GamePage;
