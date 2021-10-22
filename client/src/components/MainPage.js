import React, { useEffect, useState } from 'react'
import * as S from '../styled/App'
import Room from '../contents/Room'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const MainPage = () => {

    let history = useHistory();

    const [rlist, setRlist] = useState([]);
    const [oncreate, setOncreate] = useState(false);
    const [room, setRoom] = useState({password: "", admin: localStorage.name, name: ""})

    useEffect(()=>{
        axios.get('http://localhost:1234/room')
            .then(response => {
                setRlist([...response]);
            })
    },[])

    const createRoom = () => {
        axios.post('http://localhost:1234/room', room)
            .then(response => {
                history.push(`/game/${response.data}`)
            })
    }

    const setMax = (e) => {
        setRoom({...room, price: e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 8)})
    }

    const CreateBorder = () => {
        return(
        <S.Background>
            <S.createBorder>
                <S.X onClick={()=>setOncreate(false)}>X</S.X>
                <h2>방 만들기</h2>
                <S.LoginInput value={room.name} placeholder="방이름" onChange={(e)=>setRoom({...room, name: e.target.value})}></S.LoginInput>
                <S.LoginInput value={room.max} placeholder="인원수 제한" onChange={(e)=>setMax(e)}></S.LoginInput>
                <S.LoginInput value={room.password} placeholder="비밀번호" onChange={(e)=>setRoom({...room, password: e.target.value})}></S.LoginInput>
                <S.LoginButton color="blueviolet" onClick={()=>createRoom}>방 만들기</S.LoginButton>
            </S.createBorder>
        </S.Background>
        )
    }

    return(
        <>
        <S.Main>
            <S.Border>
                <Room lists={rlist}/>
            </S.Border>
            <S.BDiv>
                <S.MButton onClick={()=>setOncreate(true)}>
                    방 만들기
                </S.MButton>
            </S.BDiv>
        </S.Main>
        {oncreate ?
            <CreateBorder />
            :
            <></>
        }
        </>
    )
}

export default MainPage