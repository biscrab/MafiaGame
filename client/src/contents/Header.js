import React,{useState} from 'react'
import * as S from '../styled/App'

const Header = () => {

    const [onlogin, setLogin] = useState(false);

    const LoginBorder = () => {

        const [input, setInput] = useState({name: "", password: ""})
    
        const login = () => {
            let test = Test();
            if(test){
                alert("1");
            }
        }
    
        const signUp = () => {
    
        }
    
        const Test = () => {
            if(input.name !== ""&&input.password !== ""){
                //
                return true;
            }
            else{
                alert("아이디와 비밀번호를 모두 입력해 주세요.")
                return false;
            }
        }
    
        return(
            <S.Background>
                <S.LoginBorder>
                    <S.X onClick={()=>setLogin(false)}>X</S.X>
                    <h1>로그인</h1>
                    <S.LoginInput value={input.name} onChange={(e)=>setInput({...input, name: e.target.value})}></S.LoginInput>
                    <S.LoginInput value={input.password} onChange={(e)=>setInput({...input, password: e.target.value})} type="password"></S.LoginInput>
                    <S.LoginButton color="royalblue" onClick={()=>login()}>로그인</S.LoginButton>
                    <S.LoginButton color="blueviolet" onClick={()=>signUp()}>회원가입</S.LoginButton>
                </S.LoginBorder>
            </S.Background>
        )
    }

    return(
        <>
        <S.Header>
            <h3>마피아</h3>
            <h3 onClick={()=>setLogin(true)}>로그인/회원가입</h3>
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