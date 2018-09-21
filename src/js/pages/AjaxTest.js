import React from 'react';
import ajaxUtil from "../utils/ajaxUtil";
import {Button} from 'antd'

const dataUrl = '/Manager/Dictionary/Data';

/***
 * ajax测试组件
 */
export default class AjaxTest extends React.Component {
    /**
     * 查看
     */
    view = () => {
        ajaxUtil.get(`${__apiRoot}${dataUrl}/view`, {
            sort: '[{"property":"name","direction":"ASC"},{"property":"id","direction":"asc"}]',
            filter: '[{"operator":"like","value":"a","property":"key"}]'
        }, (err, res) => {
            console.log('view', res.body);
        })
    }

    /**
     * 创建
     */
    create = () => {
        ajaxUtil.post(`${__apiRoot}${dataUrl}/create?XDEBUG_SESSION_START=16376`, {
            id: "Massoft.model.Dictionary-1",
            name: "testName",
            key: "testKey"
        }, (err, res) => {
            console.log('create', res.body);
        }, 'json');
    }

    /**
     * 更新
     */
    update = () => {
        ajaxUtil.post(`${__apiRoot}${dataUrl}/update`, {
            id: 73,
            key: "737373",
            name: "update"
        }, (err, res) => {
            console.log('update', res.body);
        }, 'json');
    }

    /**
     * 单条删除
     */
    delete = () => {
        ajaxUtil.post(`${__apiRoot}${dataUrl}/destroy`, {id: 89}, (err, res) => {
            console.log('delete', res.body);
        }, 'json');
    }

    /**
     * 多条删除
     * 注：create和update同样支持多条批量提交，提交格式和删除的一致
     */
    deleteMuti = () => {
        ajaxUtil.post(`${__apiRoot}${dataUrl}/destroy`, [{id: 88}, {id: 87}], (err, res) => {
            console.log('delete', res.body);
        }, 'json');
    }

    /**
     * 登录测试
     */
    login = ()=>{
        ajaxUtil.post(`${__apiRoot}/User/Pub/Index/login`, {name: 'luck',password: '12345'}, (err, res) => {
            console.log('login', res.body);
        });
    }

    render() {
        return <div>
            <div><Button onClick={this.view}>列表</Button></div>
            <div><Button onClick={this.create}>添加</Button></div>
            <div><Button onClick={this.update}>更新</Button></div>
            <div><Button onClick={this.delete}>删除单条</Button></div>
            <div><Button onClick={this.deleteMuti}>删除多条</Button></div>
            <div><Button onClick={this.login}>登录测试</Button></div>
        </div>
    }
}