import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from './components/service/App';
import Loadable from 'react-loadable';
import PageLoading from './components/common/PageLoading';
import {userIsAuthenticated} from "./filter/auth";
import {Provider} from "react-redux";
import store from "./store";


//hello 测试
const Hello = Loadable({
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
                    <Route exact path={`${match.url}/`} component={Hello}/>
                    <Route exact path={`${match.url}/a`} component={AjaxTest}/>
                    <Route exact path={`${match.url}/b`} component={Divs}/>
                </Switch>
            </App>
        );

        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/manager" component={Manager}/>
                        <Route exact path="/ajaxTest" component={AjaxTest}/>
                        <Route exact path="/login" component={login}/>
                        <Route exact path="/hello" component={Hello}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
export default Root