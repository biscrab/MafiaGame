import React,{useEffect, useState} from 'react'
import './App.css';
import * as S from './styled/App'

function App() {

  const [item, setItem] = useState([]);

  let ws = new WebSocket("ws://localhost:1234/ws");

  useEffect(()=>{
      ws.onopen = () => {
      console.log("connected!");
    };
  },[])

  const sendMessage = () => {  // 화살표함수로 만들것!!
    ws.send("hello this is client Message");  // 서버로 메세지 보내는건 send
    ws.onmessage = (evt) => {
      console.log(evt);
      console.log(evt.data);
    };
  };

  return (
    <div className="App">
    <header className="App-header">
      <ul>
        {item.map(
          message => {
            return(
              <S.Chat>{message}</S.Chat>   
            )
          })
        }
      </ul>
      <button onClick={() => sendMessage()}>메세지 보내기</button>
    </header>
  </div>
  );
}

export default App;
