import React from 'react'
import * as S from '../styled/App'

const Select = ({item}) => {
    return(
        <S.Select>
            <S.SImg src={"https://icon-library.com/images/human-icon/human-icon-22.jpg"}></S.SImg>
            <S.SSpan>{item.name}</S.SSpan>
        </S.Select>
    )
}

const List = (lists) => {
    const itemList = lists.map(
        item => (
            <Select item={item}></Select>
        )
    )
    return itemList
}

export default List