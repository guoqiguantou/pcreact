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



class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //子路由 user
        const User = ({match}) => (
            <div>
                <Route path={`${match.url}`} component={user}/>
            </div>
        );
        const Divs = ({match}) => (
            <div>
                div
            </div>
        );
        const Manager =({ match }) => (
            <App>
                <Switch>
                    <Route exact path={`${match.url}/`} component={Homeindex}/>
                    <Route exact path={`${match.url}/a`} component={HelloWorld}/>
                    <Route exact path={`${match.url}/b`} component={AjaxTest}/>
                    <Route exact path={`${match.url}/charts/add`} component={HelloWorld}/>
                    <Route exact path={`${match.url}/charts/map/aa`} component={Map}/>
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