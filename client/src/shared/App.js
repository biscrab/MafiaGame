import {Route, Switch } from 'react-router-dom'
import * as S from '../styled/App'
import * as P from '../pages'
import Header from '../contents/Header'

function App() {
    return(
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={P.Main}></Route>
                <Route path="/game" component={P.Game}></Route>
            </Switch>
        </>
    )
}

export default App