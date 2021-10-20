import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { on } from 'stream';
import * as S from '../styled/App'
const ENDPOINT = 'http://localhost:1234'
let socket

const GamePage = () => {

  let params = useParams();
  let history = useHistory();

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState();
  const [onpassword, setOnpassword] = useState(false);

  let ws = new WebSocket("ws://localhost:1234/ws");
  socket = io(ENDPOINT);

  useEffect(()=>{
      ws.onopen = () => {
      console.log("connected!");
      };

      axios.post('http://localhost:1234/enter', params.id)
        .then(response => {
          if(response.data.password){
            setOnpassword(response.data.password);
          }
        })
        .catch(error => {
          /*
          history.push("/");
          alert("존재하지 않는 방 입니다.");*/
        })

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

  const PasswordBorder = () => {
    return(
    <S.Background>
      <S.passwordBorder>
        <S.X>X</S.X>
        <h2>비밀번호</h2>
        <S.LoginInput />
        <S.LoginButton>입력</S.LoginButton>
      </S.passwordBorder>
    </S.Background>
    );
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
    {onpassword
    ?
    <PasswordBorder />
    :
    <></>
    }
  </>
  );
}

export default GamePage;
