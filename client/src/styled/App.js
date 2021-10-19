import styled from "styled-components";

export const Header = styled.nav`
    background-color: blueviolet;
    position: fixed;
    top: 0;
    height: 50px;
    width: 91%;
    display: flex;
    align-items: center;
    padding: 0px 4.5%;
    justify-content: space-between;
    color: white;
`

export const Chat = styled.div`
    background-color: blueviolet;
    color: white;
    border-radius: 5px;
    text-align: center;
`

export const Game = styled.body`
`

export const IDiv = styled.div`
    background-color: white;
    position: fixed;
    width: 100%;
    height: 80px;
    bottom: 0;
    display: flex;
    padding: 2%;
    padding-bottom: 50px;
`

export const Textarea = styled.textarea`
    resize: none;
    width: 84%;
    outline: 0;
    font-size: 16px;
    border: 1px solid gray;
    padding: 1% 1%;
`

export const CButton = styled.button`
    width: 10%;
    background-color: blueviolet;
    outline: 0;
    border: 0;
    color: white;
    font-size: 18px;
`

export const Background = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 100;
`
export const LoginBorder = styled.div`
    background-color: white;
    border-radius: 10px;
    height: 350px;
    width: 350px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const X = styled.span`
    color: gray;
    height: 0;
    position: relative;
    left: 42.5%;
    top: 2.5%;
    font-size: 20px;
    :hover{
        cursor: pointer;
    }
`

export const LoginInput = styled.input`
    outline: 0;
    height: 35px;
    width: 80%;
    margin-bottom: 20px;
    border: 2px solid darkgray;
    padding: 0px 3%;
`

export const LoginButton = styled.button`
    color: white;
    background-color: ${props => props.color};
    width: 87%;
    margin-bottom: 20px;
    border: 0;
    outline: 0;
    height: 45px;
    font-size: 18px;
    :hover{
        cursor: pointer;
    }
`

export const Main = styled.body`
    display: flex;
    justify-content: center;
    padding-top: 70px;
`

export const Border = styled.div`
    background-color: white;
    border-radius: 20px;
    height: 500px;
    width: 90%;
    padding: 20px;
`

export const RoomCard = styled.div`
    border-radius: 5px;
    height: 25%;
    width: 25%;
    box-shadow: 0px 0px 10px 3px rgb(230,230,230);
    background-color: white;
    padding: 10px;
`

export const Status = styled.div`
    color: green;
    padding-right: 10px;
`

export const CName = styled.div`
    display: flex;
    align-items: center;
`

export const CExplane = styled.p`
    color: gray;
`