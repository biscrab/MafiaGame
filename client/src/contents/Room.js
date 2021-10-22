import { useHistory } from 'react-router-dom'
import * as S from '../styled/App'

const Room = ({item}) => {

    let history = useHistory();
    return(
        <S.RoomCard onClick={()=>history.push(`/game/${item.name}`)}>
            <S.CName>
            <S.Status color={item.status === 0 ? "green" : "red"}>
                <i class="fas fa-circle fa-xs"></i>
            </S.Status>
                <span>{item.name} (/{item.max})</span>
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