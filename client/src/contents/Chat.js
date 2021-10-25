import exp from 'constants'
import * as S from '../styled/App'

const Chat = (item, user) => {
    return(
        <>
        {item.user === user ?
            <S.MyChatDiv>
                <S.MyChat>{item.contents}</S.MyChat>
            </S.MyChatDiv>
            :
            <S.ChatDiv>
                <S.Chat>{item.contents}</S.Chat>
            </S.ChatDiv>
        }
        </>
    )
}

const List = (lists) => {
    const itemList = lists.map(
        item => (
            <Chat item={item} />
        )
    )
    return itemList
}

export default List