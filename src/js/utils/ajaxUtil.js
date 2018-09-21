/**
 * Created by omai on 2017/3/3.
 */
import {message} from 'antd'
import request from 'superagent'
import {Store} from 'locallyjs'
import jsonp from 'superagent-jsonp'

var ajaxUtil = {
     showLoadingCount:0,
    /**
     * 加载数据
     * @param url 地址
     * @param callback 请求回调(err, res)=>{}
     * @param showProgress 显示loading
     */
    load(url, callback, showProgress = true, toast = "加载中...") {

        if (showProgress) this.showLoading(toast);
        request
            .get(url)
            .query(this.getTokenData())
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                this.checkAuth(res);
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },
    /**
     * 加载数据
     * @param url 地址
     * @param data 参数数组
     * @param callback 请求回调(err, res)=>{}
     * @param showProgress 显示loading
     */
    get(url, data, callback, showProgress = true, toast = "加载中...") {
        if (showProgress) this.showLoading(toast);
        request
            .get(url)
            .query(this.getTokenData(data))
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                this.checkAuth(res);
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },
    /**
     * post 请求
     * @param url
     * @param params
     * @param callback
     * @param showProgress
     * @param type
     * @param toast
     */
    post(url, params, callback, type = 'form',showProgress = true,toast = '加载中……') {
        if (showProgress) this.showLoading(toast);
        request
            .post(url)
            .query(this.getTokenData())
            .type(type)
            .send(params)
            .end((err, res) => {
                if (err) {
                    console.log('err',err.response);
                }
                this.checkAuth(res);
                callback(err, res);
                if (showProgress) this.hideLoading();
            });
    },

    /**
     * jsonp
     * @param url
     * @param data 参数数组
     * @param callback
     * @param showProgress
     * @param toast
     */
    loadJsonp(url,data,callback,showProgress=false,toast="加载中..."){
        if(showProgress) Toast.loading(toast,0);
        console.log('loadJsonp',data);
        request
            .get(url)
            .query(this.getTokenData(data))
            .use(jsonp)
            .end((err, res) => {
                callback(err, res);
                if(showProgress) Toast.hide();
            });
    },
    /**
     * 保存验证数据
     * @param data
     */
    saveAuth(data) {
        localStorage.save(AUTH_SAVE_KEY, data);
    },
    showLoading(toast){
        if(this.showLoadingCount==0){
            console.log('showLoading')
            this.loading = message.loading(toast, 0);
        }
        ++this.showLoadingCount;
    },
    hideLoading(){
        --this.showLoadingCount;
        if(this.showLoadingCount==0){
            console.log('hideLoading')
            message.destroy();
        }
    },
    /**
     * 获取Token参数
     * @returns {{}}
     */
    getTokenData(data){
        if(!data) data = {};
        let store = new Store();
        let accessToken = store.get(__authSaveKey);
        let appid = store.get(__appidSaveKey);
        if (accessToken) data['access_token'] = accessToken;
        if (appid) data['appid'] = appid;
        return data;
    },
    /**
     * 用户权限处理
     * @param res
     */
    checkAuth(res){
        if(res.body && res.body.status && res.body.status.type=='login'){
           window.location.href = __loginPage;
        }
        else if(res.body && res.body.status && res.body.status.access_token){
            let store = new Store();
            store.set(__authSaveKey, res.body.status.access_token);
        }
    }
}
export default ajaxUtil;