import { useHistory } from 'react-router-dom'
import * as S from '../styled/App'

const Room = ({item}) => {

    let history = useHistory();

    return(
        <S.RoomCard onClick={()=>history.push(`/game/${item.id}`)}>
            <S.CName>
            <S.Status color={item.status === "open" ? "green" : "red"}>
                <i class="fas fa-circle fa-xs"></i>
            </S.Status>
                <span>{item.tittle}</span>
            </S.CName>
        </S.RoomCard>
    )
}   

const List = ({lists}) => {
   const itemList = lists.map(
        item => {
            return(
                <Room item={item}/>
            )
        }
    )
    return itemList
}

export default List