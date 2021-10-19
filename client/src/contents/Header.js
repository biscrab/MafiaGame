import React,{useState} from 'react'
import * as S from '../styled/App'
import LoginBorder from './LoginBorder';

const Header = () => {

    const [onlogin, setLogin] = useState(false);

    return(
        <>
        <S.Header>
            <h3>마피아</h3>
            <h3 onClick={()=>setLogin(true)}>로그인</h3>
        </S.Header>
        {onlogin ?
            <LoginBorder />
            :
            <></>
        }
        </>
    )
}

export default Header