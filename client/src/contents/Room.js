import { useHistory } from 'react-router-dom'
import * as S from '../styled/App'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAsync } from "react-async";

const Room = ({item}) => {

    const [member, setMember] = useState();
    /*
    const countMember = async() => {
        var member = await axios.get('http://localhost:1234/test', item.name);
    }*/

    useEffect(()=>{
        axios.get('http://localhost:1234/member')
            .then(res => {
                console.log(res.data);
        })
    })

    let history = useHistory();

    return(
        <S.RoomCard onClick={()=>history.push(`/game/${item.name}`)}>
            <S.CName>
            <S.Status color={item.status === 0 ? "green" : "red"}>
                <i class="fas fa-circle fa-xs"></i>
            </S.Status>
                <span>{item.name} ({member}/{item.max})</span>
            </S.CName>
        </S.RoomCard>
    )
}   

const List = ({lists}) => {
   const itemList = lists.map(
        item => (
            <Room item={item}/>
        )
    )
    return itemList
}

export default List