import {Route, Switch } from 'react-router-dom'
import * as S from '../styled/App'
import * as P from '../pages'
import Header from '../contents/Header'
import '../App.css'

function App() {
    return(
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={P.Main}></Route>
                <Route path="/game/:id" component={P.Game}></Route>
            </Switch>
        </>
    )
}

export default App