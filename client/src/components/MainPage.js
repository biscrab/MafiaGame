import React, { useState } from 'react'
import * as S from '../styled/App'
import Room from '../contents/Room'

const MainPage = () => {

    const [rlist, setRlist] = useState([]);

    return(
        <S.Main>
            <S.Border>
                <Room lists={rlist}/>
            </S.Border>
        </S.Main>
    )
}

export default MainPage