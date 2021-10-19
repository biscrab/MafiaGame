import React, { useState } from 'react'
import * as S from '../styled/App'
import Room from '../contents/Room'
import axios from 'axios'

const MainPage = () => {

    const [rlist, setRlist] = useState([]);
    const [oncreate, setOncreate] = useState(false);

    const createRoom = () => {
        axios.post()
    }

    const CreateBorder = () => {
        return(
        <S.Background>
            <S.createBorder>
                <S.X onClick={()=>setOncreate(false)}>X</S.X>
                <h2>방 만들기</h2>
                <S.LoginInput placeholder="방이름"></S.LoginInput>
                <S.LoginInput placeholder="인원수 제한"></S.LoginInput>
                <S.LoginInput placeholder="비밀번호"></S.LoginInput>
                <S.LoginButton color="blueviolet">방 만들기</S.LoginButton>
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