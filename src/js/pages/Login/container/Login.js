/**
 *  容器组件对象
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as action from "../data/action/action";
import LoginForm from "../pages/NormalLoginForm";

import {Store} from 'locallyjs'
import paramUtil from "../../../utils/paramUtil";

import {notification} from "antd";

const storeLocal = new Store();


class Login extends Component{
    constructor(props) {
        super(props)
        this.Loginin = this.Loginin.bind(this);
        this.redirect = paramUtil.get('redirect');
        if(!this.redirect){
            this.redirect = '/';
        }
    }
    Loginin(uname,upasswd,captcha){
        this.props.dispatch(action.loginPost(uname,upasswd,captcha));
    }
    componentWillReceiveProps(nextProps){
        const {token,history,islog} = nextProps;
        if(token && token !== ""){///登录成功
            window.location.href = this.redirect;
        }
        if(0==islog || 2==islog){
            notification.error({
                message: '错误',
                description: '登陆出错.',
                duration:3
            });
        }
    }
    render(){
        return (
            <LoginForm onClick={this.Loginin} {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    const {login} = state;
    return (
        login
    )
}
export default connect(mapStateToProps)(Login);