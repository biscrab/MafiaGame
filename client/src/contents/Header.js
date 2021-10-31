import React,{useEffect, useState} from 'react'
import * as S from '../styled/App'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['m-token']);

    const [onlogin, setLogin] = useState(false);

    const [name, setName] = useState();

    let history = useHistory();

    /*
    useEffect(()=>{
        axios.get('http://localhost:1234/user')
            .then(res => setName(res));
    },[])*/

    const LoginBorder = () => {

        const [input, setInput] = useState({name: "", password: ""})
    
        const login = () => {
            let test = Test();
            if(test){
                axios.post('http://localhost:1234/login', input)
                    .then(res => {
                        setCookie('m-token', res.data);
                        setLogin(false);
                    })
                    .catch(error => alert("로그인에 실패했습니다."))
            }
        }
    
        const signUp = () => {
            let test = Test();
            if(test){
                axios.post('http://localhost:1234/signup', input)
                    .then(res => console.log(res))
                    .catch(error => alert("회원가입에 실패했습니다."))
            }
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
                    <S.LoginInput placeholder="이름" onChange={(e)=>setInput({...input, name: e.target.value})} value={input.name}></S.LoginInput>
                    <S.LoginInput placeholder="비밀번호" onChange={(e)=>setInput({...input, password: e.target.value})} type="password" value={input.password}></S.LoginInput>
                    <S.LoginButton color="royalblue" onClick={()=>login()}>로그인</S.LoginButton>
                    <S.LoginButton color="blueviolet" onClick={()=>signUp()}>회원가입</S.LoginButton>
                </S.LoginBorder>
            </S.Background>
        )
    }

    return(
        <>
        <S.Header>
            <div onClick={()=>history.push('/')}>
            <img src={"https://cdn-icons.flaticon.com/png/512/2099/premium/2099872.png?token=exp=1635677440~hmac=aa320fe3833e4343c4e200eddac5b5b0"}></img>
            <h3>마피아</h3>
            </div>
            {name ?
            <span>{name}</span>
            :
            <span onClick={()=>setLogin(true)}>로그인/회원가입</span>
            }
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