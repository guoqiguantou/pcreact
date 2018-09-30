import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from './components/service/App';
import Loadable from 'react-loadable';
import PageLoading from './components/common/PageLoading';
import {Provider} from "react-redux";
import store from "./store";

//首页
const Homeindex = Loadable({
    loader: () => import('./pages/Homeindex'),
    loading: PageLoading
});

//HelloWorld 测试
const HelloWorld = Loadable({
    loader: () => import('./pages/HelloWorld'/* webpackChunkName:"HelloWorld" */),
    loading: PageLoading
});

//用户登陆
const login = Loadable({
    loader: () => import('./pages/login'),
    loading: PageLoading
});

//Ajax测试
const AjaxTest = Loadable({
    loader: () => import('./pages/AjaxTest'),
    loading: PageLoading
});

//map测试
const Map = Loadable({
    loader: () => import('./pages/Map'),
    loading: PageLoading
});
//Table
const Table = Loadable({
    loader: () => import('./pages/Table'),
    loading: PageLoading
});
//Forma
const Forma = Loadable({
    loader: () => import('./pages/Forma'),
    loading: PageLoading
});
//Formb
const Formb = Loadable({
    loader: () => import('./pages/Formb'),
    loading: PageLoading
});
const Tour= Loadable({
    loader: () => import('./pages/404'),
    loading: PageLoading
});
class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //子路由 user
        const Forms = ({match}) => (

            <div>
                111111111
            </div>
        );
        const Manager =({ match }) => (
            <App>
                <Switch>
                    <Route exact path={`${match.url}/`} component={Homeindex}/>
                    <Route exact path={`${match.url}/table`} component={Table}/>
                    <Route exact path={`${match.url}/map`} component={Map}/>
                    <Route exact path={`${match.url}/form/forma`} component={Forma}/>
                    <Route exact path={`${match.url}/form/formb`} component={Formb}/>
                    <Route exact path={`${match.url}/404`} component={Tour}/>
                </Switch>
            </App>
        );

        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/manager" component={Manager}/>
                        <Route exact path="/login" component={login}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
export default Root