import * as S from '../styled/App'

const Room = ({item}) => {
    return(
        <S.RoomCard>
            <S.CName>
            <S.Status color={item.status === "open" ? "green" : "red"}>
                <i class="fas fa-circle fa-xs"></i>
            </S.Status>
                <span>{item.tittle}</span>
            </S.CName>
            <S.CExplane>{item.contents}</S.CExplane>
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