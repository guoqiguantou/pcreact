import Login from "./container/Login";
import React,{Component} from "react";

import {Provider} from "react-redux";

import store from "./data/store";

class LoginIndex extends Component{
    render (){
        return (
            <Provider store={store}>
                <Login />
            </Provider>
        )
    }
}
export default LoginIndex;