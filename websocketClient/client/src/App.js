import React,{useEffect, useState} from 'react'
import io from 'socket.io-client';
import * as S from './styled/App'
import './App.css'

function App() {

  const [item, setItem] = useState([]);
  const [comment, setComment] = useState({name: "", contents: ""})

  let ws = new WebSocket("ws://localhost:1234/ws");
  let socket = io("http://localhost:1234");

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

  const onChange = (e) => {
    const {name, value} = e.target;
    setComment({...comment, [name]: value})
  }

  socket.on("message", (message) =>{
    setItem([...item, message]);
  });

  return (
    <>
      <ul>
        {item.map(
          message => {
            return(
              <p>{message}</p>   
            )
          })
        }
      </ul>
      <input name="name" onChange={(e)=>onChange(e)} value={comment.name}/>
      <input name="contents" onChange={(e)=>onChange(e)} value={comment.contents}/>
      <button onClick={() => sendMessage()}>메세지 보내기</button>
      <button onClick={()=>console.log(item)}>item</button>
  </>
  );
}

export default App;
