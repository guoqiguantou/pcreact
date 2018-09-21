import Immutable from "immutable";
import * as actionType from "../action/action-type";

const defaultState = {
    token:"",
    user:null,
    islog : 1,//0:代码出错;1:登陆成功;2:登陆失败
    captchisshow : false
}
const login = (state = defaultState,action) =>{
    let imuDataObj;
    switch(action.type){
        case "LOGIN_LOGININ_POST":
            imuDataObj = Immutable.fromJS(action.data);
            return {
                ...state,
                ...{user:imuDataObj.get("data").toJS()},
                ...{token:imuDataObj.get("status").get("access_token")}
            }
        case actionType.LOGIN_ERROR:
            return {
                ...state,
                ...{islog : action.islog}
            }
        case actionType.LOGIN_CAPTCHA:
            return {
                ...state,
                ...{captchisshow : action.isshow}
            }
        default:
            return state
    }
}
export default login;