import {Route, Switch } from 'react-router-dom'
import * as S from '../styled/App'
import * as P from '../pages'
import Header from '../contents/Header'
import '../App.css'
import axios from 'axios'

function App() {

    function getCookie(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
        }

    axios.defaults.headers["Authorization"] = getCookie('m-token');

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