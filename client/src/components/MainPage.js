import React, { useEffect, useState } from 'react'
import * as S from '../styled/App'
import Room from '../contents/Room'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const MainPage = () => {

    let history = useHistory();

    const [rlist, setRlist] = useState([]);
    const [oncreate, setOncreate] = useState(false);
    const [room, setRoom] = useState({password: "", admin: localStorage.name, name: "", max: 8})

    useEffect(()=>{
        /*axios.get('http://localhost:1234/room')
            .then(res => {
                setRlist([...res.data]);
        })*/
    })
    
    const createRoom = () => {
        axios.post('http://localhost:1234/room', room)
            .then(res => {
                history.push(`/game/${res.data}`)
            })
    }

    const setMax = (e) => {
        setRoom({...room, price: e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')})
    }

    const onChange = (e) => {
        const {name, value} = e.target

        setRoom({
            ...room,
            [name]: value
        })
    }

    const CreateBorder = () => {
        return(
        <S.Background>
            <S.CreateBorder>
                <S.X onClick={()=>setOncreate(false)}>X</S.X>
                <h2>방 만들기</h2>
                <S.LoginInput name="name" placeholder="방이름" onChange={(e)=>onChange(e)} value={room.name} />
                <S.LoginInput placeholder="인원수 제한" onChange={(e)=>setMax(e)} value={room.max} />
                <S.LoginInput name="password" placeholder="비밀번호" onChange={(e)=>onChange(e)} value={room.password} />
                <S.LoginButton color="blueviolet" onClick={()=>createRoom()}>방 만들기</S.LoginButton>
            </S.CreateBorder>
        </S.Background>
        )
    }

    return(
        <>
        <S.Main>
            <S.Border onClick={console.log(rlist)}>
                {rlist ?
                <Room lists={rlist}/>
                :
                <></>
                }
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