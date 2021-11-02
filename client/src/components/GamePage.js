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
  const [user, setUser] = useState([
  {name: "1", job: 1, status: 0}, 
  {name: "1", job: 1, status: 0},
  {name: "1", job: 0, status: 0},
  {name: "1", job: 2, status: 0},
  {name: "1", job: 1, status: 0},
  {name: "1", job: 1, status: 0},
  {name: "1", job: 1, status: 1}]);

  const [onleader, setOnleader] = useState();

  const [onelect, setOnelect] = useState(false);
  const [selected, setSelect] = useState()

  const [onkill, setKill] = useState(false)

  const [onheal, setHeal] = useState(false);

  const [status, setStatus] = useState(0);

  const [job, setJob] = useState(1);

  const [elected, setElected] = useState(false);

  const [name, setName] = useState();

  const socket = io("localhost:1234");
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

  /*
  useEffect(()=>{
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
        })
        socket.emit("join", params.id);
        axios.get('http://localhost:1234/job')
          .then(res => setJob(res.data))
  },[])*/

  const onKeyPress = (e) => {
    if(e.key === "Enter"){
      sendMessage();
    }
  }
  
  useEffect(()=>{
      axios.post('http://localhost:1234/getchat', {name: params.id})
      .then(res => { 
        //setComments(res.data);
        setComments(res.data);
      })
      axios.get('http://localhost:1234/user')
      .then(res => { 
        //setComments(res.data);
        setName(res.data)
      })
      axios.post('http://localhost:1234/status', {name: params.id})
        .then(res => {
          setStatus(res.data)
      })
      axios.post('http://localhost1234/member', {name: params.id})
        .then(res => {
          setUser(res.data)
        })
  })

      /*  
    axios.get('http://localhost:1234/day', params.id)
      .then(res => setDay(res.data))
    axios.get('http://localhost:1234/member', params.id)
      .then(res => setUser(res.data))*/

  useEffect(()=>{
    setSelect("");
    if(status === 2){
      document.body.style.backgroundColor = "black";
    }
    else{
      document.body.style.backgroundColor = "#eeeeee";
      if(status === 1){
        setElected(false);
      }
    }
  },[status])

  const sendMessage = () => {
    if(messange){
      //socket.emit("message", {id: params.id, contents: messange, user: "1"});
      document.body.scrollTop = document.body.scrollHeight;
    }
  };

  const gameStart = () => {
    axios.post('/start', {name: params.id})
  }

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

  function elect(i) {
    setSelect(i);
    setOnelect(false);
    setElected(true);
  }

  function startElect() {
    if(status === 0){
      if(elected){
        alert("이미 투표 하셨습니다.")
      }
      else{
        alert(1);
        /*
        axios.post('http://localhost:1234/vote', item)
          .then(res => setElected(false))*/
      }
    }
    else{
      alert("지금은 투표시간이 아닙니다.")
    }
  }
  
  const ElectBorder = () => {
    return(
      <S.Background>
        <S.SelectBorder>
          <S.BH>투표할 사람을 선택해 주세요</S.BH>
        <S.SB>
        {user.map(
          i => (
            <S.Select onClick={()=>elect(item)} shadow={selected === item ? "0px 0px 1px 1px rgba(100, 0, 255)": ""}>
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

  const MBorder = () => {
    return(
      <S.Background>
        <S.SelectBorder>
          <S.BH>살해할 사람을 선택해 주세요</S.BH>
        <S.SB>
        {user.map(
          i => (
            <>
            {i.job !== 1 ?
            <S.MSelect onClick={()=>elect(item)} shadow={selected === item ? "0px 0px 1px 1px rgba(255, 0, 0)": ""}>
              <S.SImg src={"https://icon-library.com/images/icon-human/icon-human-21.jpg"}></S.SImg>
              <S.SSpan>{i.name}</S.SSpan>
            </S.MSelect>
            :
            <></>
            }
            </>
          )
        )}
        </S.SB>
        </S.SelectBorder>
      </S.Background>
    )
  }

  const DBorder = () => {
    return(
      <S.Background>
        <S.SelectBorder>
          <S.BH>치료할 사람을 선택해 주세요</S.BH>
        <S.SB>
        {user.map(
          i => (
            <S.DSelect onClick={()=>elect(item)} shadow={selected === item ? "0px 0px 1px 1px rgba(0, 255, 0)": ""}>
              <S.SImg src={"https://icon-library.com/images/icon-human/icon-human-21.jpg"}></S.SImg>
              <S.SSpan>{i.name}</S.SSpan>
            </S.DSelect>
          )
        )}
        </S.SB>
        </S.SelectBorder>
      </S.Background>
    )
  }

  const getjob = (id) => {
    var job = ["시민", "마피아", "경찰", "의사"]
    return job[id];
  }

  const LeaderBorder = () => {
    return(
      <S.Background>
        <S.LeaderBorder>
          <S.LX onClick={()=>setOnleader(false)}>X</S.LX>
          <S.UserUl>
          <S.LH>🏆 {} 우승 🏆</S.LH>
          {user.map(
            item => (
              <S.UserList>
                <span>{item.name} ({getjob(1)})</span>
                <span>(생존)</span>
              </S.UserList>
            )
          )}
          </S.UserUl>
        </S.LeaderBorder>
      </S.Background>
    )
  }

  const Action = () => {
    const j = ["살인", "조사", "치료"]
    return(
      <button>{j[job-1]}</button>
    )
  }

  const NameBorder = () => {
    if(job === 1){
      return(
      <>
      {user.map(
        i => (
          <>
          {i.job === 1 ?
            <S.MName color={i.status === 0 ? "crimson" : "red"} bgcolor={i.status === 0 ? "rgba(200, 200, 200, 0.3)" : "black"}>{i.name}</S.MName>
            :
            <S.Name color={i.status === 0 ? "darkgray" : "rgb(50, 50, 50)"} bgcolor={i.status === 0 ? "rgba(200, 200, 200, 0.3)" : "rgb(190, 190, 190)"}>{i.name}</S.Name>
          }
          </>
        )
      )}
      </>
      );
    }
    else{
      return(
      <>
      {user.map(
        i => (
          <S.Name color={i.status === 0 ? "darkgray" : "rgb(50, 50, 50)"} bgcolor={i.status === 0 ? "rgba(200, 200, 200, 0.3)" : "rgb(190, 190, 190)"}>{i.name}</S.Name>
        )
      )}
      </>
      )
    }
  }

  var d = ["대기중", "낮", "밤"];
  var i = ["https://cdn-icons-png.flaticon.com/512/889/889843.png",
           "https://cdn-icons-png.flaticon.com/512/3917/3917805.png",
           "https://cdn-icons-png.flaticon.com/512/547/547433.png"]

  return (
    <>
    <S.Game>
      <S.NameDiv>
        <NameBorder />
      </S.NameDiv>
      <S.TimeHead>
        <img src={i[status]} />
        <span>{d[status]}</span>
      </S.TimeHead>
      <S.CDiv>
        {comments.map(
          message => (
            <>
            {message.name === name ?
                <S.MyChatDiv>
                    <S.MyChat>{message.chat}</S.MyChat><S.CImg src={"https://w7.pngwing.com/pngs/1/964/png-transparent-user-profile-computer-icons-login-profile-icon-police-officer-black-avatar.png"}></S.CImg>
                </S.MyChatDiv>
                :
                <S.ChatDiv>
                    <S.CImg src={"https://w7.pngwing.com/pngs/1/964/png-transparent-user-profile-computer-icons-login-profile-icon-police-officer-black-avatar.png"}></S.CImg><S.Chat>{message.name}: {message.chat}</S.Chat>
                </S.ChatDiv>
            }
            </>   
          ))
        }
      </S.CDiv>
      <S.Info>
        <S.Time>
          {status === 0 ?
            <button onClick={()=>startElect()}>투표하기</button>
            :
              <Action />
          }
          <button onClick={()=>gameStart()}>게임시작</button>
        </S.Time>
      <S.IDiv>
        <S.Textarea onChange={(e)=>setMessange(e.target.value)} onKeyPress={(e)=>onKeyPress(e)} value={messange}/>
        <>
        <S.CButton onClick={() => sendMessage()}>메세지 보내기</S.CButton>
        {1 ? 
        <></>
        :
        <S.GameStart onClick={() => gameStart()}>게임시작</S.GameStart>
        }
        </>
      </S.IDiv>
      </S.Info>
  </S.Game>
    {onpassword
    ?
    <PasswordBorder />
    :
    <></>
    }
    {onelect ?
      <ElectBorder />
      : 
      <></>
    }
    {onkill ?
      <MBorder />
      :
      <></>
    }
    {onheal ?
      <DBorder />
      :
      <></>
    }
    {onleader ?
      <LeaderBorder />
      :
      <></>
    }
  </>
  );
}

export default GamePage;
