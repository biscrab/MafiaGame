import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import * as S from '../styled/App'
import io from 'socket.io-client'

const GamePage = () => {

  let params = useParams();
  let history = useHistory();

  const [item, setItem] = useState([]);
  const [comments, setComments] = useState([]);
  const [messange, setMessange] = useState();
  const [ipassword, setIpassword] = useState();
  const [onpassword, setOnpassword] = useState();
  const [user, setUser] = useState([{name: "1"}, {name: "1"}, {name: "1"}, {name: "1"}, {name: "1"}, {name: "1"}, {name: "1"}]);
  const [onselect, setOnselect] = useState(false);
  const [selected, setSelected] = useState()

  const socket = io("http://localhost:1234");
  socket.on("connection", () => { 
    console.log("connected"); 
  });

  socket.on("disconnect", () => {
    console.log("discount")
  });

  socket.on("chat", (data)=>{
    console.log(data);
    setComments([...comments, {id: data.id, contents: data.contents, user: data.user}]);
  })

  useEffect(()=>{
    /*
      axios.post('http://localhost:1234/enter', params.id)
        .then(response => {
          if(response.data.password){
            setOnpassword(response.data.password);
          }
          else{
            socket.join(params.id);
          }
        })
        .catch(error => {
          history.push("/");
          alert("존재하지 않는 방 입니다.");
        })*/
        socket.emit("join", params.id)
  },[])
  /*
  useEffect(()=>{
    axios.get('http://localhost:1234/chat')
  })*/

  const sendMessage = () => {
    if(messange){
      socket.emit("message", {id: params.id, contents: messange, user: "1"});
      document.body.scrollTop = document.body.scrollHeight;
    }
  };

  const PasswordBorder = () => {
    return(
    <S.Background>
      <S.passwordBorder>
        <S.X>X</S.X>
        <h2>비밀번호</h2>
        <S.LoginInput onChange={(e)=>setIpassword(e.target.value)} value={ipassword}/>
        <S.LoginButton>입력</S.LoginButton>
      </S.passwordBorder>
    </S.Background>
    );
  }

  function select(item) {
    setSelected(item);
    setOnselect(false);
  }
  
  const SelectBorder = () => {
    return(
      <S.Background>
        <S.SelectBorder>
        <S.SB>
        {user.map(
          i => (
            <S.Select onClick={()=>select(item)} shadow={selected === item ? "0px 0px 1px 1px rgba(100, 0, 255)": ""}>
              <S.SImg src={"https://icon-library.com/images/icon-human/icon-human-21.jpg"}></S.SImg>
              <S.SSpan>{i.name}</S.SSpan>
            </S.Select>
          )
        )}
        </S.SB>
        </S.SelectBorder>
      </S.Background>
    )
  }

  return (
    <>
    <S.Game>
      <S.CDiv>
        {comments.map(
          message => (
            <>
            {message.user === user ?
                <S.MyChatDiv>
                    <S.MyChat>{message.contents}</S.MyChat><S.CImg src={"https://w7.pngwing.com/pngs/1/964/png-transparent-user-profile-computer-icons-login-profile-icon-police-officer-black-avatar.png"}></S.CImg>
                </S.MyChatDiv>
                :
                <S.ChatDiv>
                    <S.CImg src={"https://w7.pngwing.com/pngs/1/964/png-transparent-user-profile-computer-icons-login-profile-icon-police-officer-black-avatar.png"}></S.CImg><S.Chat>{message.contents}</S.Chat>
                </S.ChatDiv>
            }
            </>   
          ))
        }
      </S.CDiv>
      <S.IDiv>
        <S.Textarea onChange={(e)=>setMessange(e.target.value)} value={messange}/>
        <S.CButton onClick={() => sendMessage()}>메세지 보내기</S.CButton>
        <button onClick={()=>console.log(comments)}></button>
      </S.IDiv>
  </S.Game>
    {onpassword
    ?
    <PasswordBorder />
    :
    <></>
    }
    {onselect ?
      <SelectBorder />
      : 
      <></>
    }
  </>
  );
}

export default GamePage;
