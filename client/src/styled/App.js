import exp from "constants";
import styled from "styled-components";

export const Header = styled.nav`
    background-color: blueviolet;
    position: fixed;
    top: 0;
    height: 50px;
    width: 98%;
    display: flex;
    align-items: center;
    padding: 0% 1%;
    justify-content: space-between;
    color: white;
    h3{
        :hover{
            cursor: pointer;
        }
    }

    span{
        :hover{
            cursor: pointer;
        } 
    }

    div{
        display: flex;
        align-items: center;
    }

    img{
        height: 30px;
        padding-right: 5px;
    }
`

export const ChatDiv = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const MyChatDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`

export const MyChat = styled.div`
    background-color: blueviolet;
    color: white;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    height: 40px;
`

export const Chat = styled.span`
    background-color: blueviolet;
    color: white;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    width: 50px;
    margin-left: 10px;
    height: 30px;
`

export const Game = styled.div`
`

export const TimeHead = styled.div`
    position: fixed;
    top: 60px;
    display: flex;
    align-items: center;
    padding-left: 1%;

    img{
        height: 25px;
    }

    span{
        color: gray;
        font-size: 18px;
        padding-left: 5px;
    }
`

export const CUDiv = styled.div`
    position: relative;
    top: 50px;
    display: flex;
`

export const USpan = styled.span`

`

export const CDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    top: 90px;
`

export const CImg = styled.img`
    height: 40px;
`

export const GameStart = styled.button`
    border: 0;
    outline: 0;
    background-color: crimson;
    color: white;
    width: 10%;
    height: 80px;
    font-size: 18px;
`

export const Info = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
`

export const Time = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 1%;

    button{
        background-color: white;
        border: 0;
        outline: 0;
        height: 40px;
        border-radius: 4px;
        width: 150px;
        margin-left: 2px;

        :hover{
            background-color: blueviolet;
            color: white;
        }
    }
`

export const IDiv = styled.div`
    background-color: white;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 50px;
`

export const Textarea = styled.textarea`
    resize: none;
    width: 70%;
    outline: 0;
    font-size: 16px;
    border: 2px solid darkgray;
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

export const LeaderBorder = styled.div`
    background-color: white;
    border-radius: 10px;
    height: 460px;
    width: 460px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

export const LH = styled.h2`
    margin: 0;
    text-align: center;
`

export const LX = styled.span`
    color: gray;
    height: 0;
    position: relative;
    left: 49.5%;
    bottom: 2.5%;
    font-size: 20px;
    :hover{
        cursor: pointer;
    }
`

export const UserUl = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    width: 90%;
`

export const UserList = styled.div`
    border-bottom: 1px solid gray;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`

export const SelectBorder = styled.div`
    background-color: white;
    border-radius: 10px;
    height: 460px;
    width: 460px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
`

export const BH = styled.h2`
    margin: 0;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
`

export const SB = styled.div`
    height: 440px;
    width: 440px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
`

export const Select = styled.div`
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: ${props => props.shadow};
    width: 100px;
    height: 140px;
    padding: 10px;
    border-radius: 3%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px;
    background-color: rgb(250, 250, 250);
    cursor: pointer;

    :hover{
        box-shadow: 0px 0px 3px 3px rgba(100, 0, 255, 0.3);
    }
`

export const MSelect = styled.div`
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: ${props => props.shadow};
    color: white;
    width: 100px;
    height: 140px;
    padding: 10px;
    border-radius: 3%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px;
    background-color: rgb(255, 70, 70);
    cursor: pointer;

    :hover{
        box-shadow: 0px 0px 3px 3px rgba(255, 0, 0);
    }
`

export const DSelect = styled.div`
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: ${props => props.shadow};
    width: 100px;
    height: 140px;
    padding: 10px;
    border-radius: 3%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px;
    background-color: rgb(250, 250, 250);
    cursor: pointer;

    :hover{
        box-shadow: 0px 0px 3px 3px rgba(0, 255, 0);
    }
`

export const SImg = styled.img`
    width: 100px;
    height: 100px;
`

export const SSpan = styled.span`
    padding-top: 10px;
`

export const CreateBorder = styled.div`
    background-color: white;
    border-radius: 10px;
    height: 330px;
    width: 350px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const passwordBorder = styled.div`
    background-color: white;
    border-radius: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
    width: 300px;
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
    position: relative;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
    width: 90%;
    flex-direction: column;
`

export const Border = styled.div`
    background-color: white;
    border-radius: 20px;
    height: 450px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`

export const BDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const MButton = styled.button`
    border: 0;
    outline: 0;
    height: 60px;
    width: 200px;
    position: relative;
    top: 20px;
    background-color: blueviolet;
    border-radius: 5px;
    color: white;
    font-size: 18px;
`

export const RoomCard = styled.div`
    border-radius: 5px;
    height: 25%;
    width: 25%;
    margin: 1%;
    box-shadow: 0px 0px 10px 3px rgb(230,230,230);
    background-color: white;
    padding: 10px;
    :hover{
        cursor: pointer;
    }
`

export const Status = styled.div`
    color: green;
    padding-right: 10px;
`

export const CName = styled.div`
    display: flex;
    align-items: center;
`