import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import * as S from '../styled/App'
import io from 'socket.io-client'

const GamePage = () => {

  let params = useParams();
  let history = useHistory();

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState();
  const [onpassword, setOnpassword] = useState(false);

  const socket = io("localhost:1234");
  socket.on("connect", () => { console.log("connection server"); });

  /*socket.on("connect", () => {
    // either with send()
    socket.send("Hello!");
  })

  socket.on("message", data => {
    setItem({...item, data})
  }) */

  useEffect(()=>{
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

  const sendMessage = () => {
    if(comment){
      io("localhost:1234").emit("message", comment);
      document.body.scrollTop = document.body.scrollHeight;
    }
  };

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
