import {Route} from 'react-router-dom'
import * as S from '../styled/App'
import * as P from '../pages'

function App() {
    return(
        <>
            <S.Header />
            <Route exact path="/" components={P.Main}></Route>
            <Route path="/game" components={P.Game}></Route>
        </>
    )
}

export default App