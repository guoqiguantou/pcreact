import ajaxUtil from "../../../../utils/ajaxUtil";
import * as actionType from "./action-type";

export const postLoginin = (data) => ({
    type:"LOGIN_LOGININ_POST",
    data
})
export const loginErr  = islog => ({
    type:actionType.LOGIN_ERROR,
    islog
})

export const logincaptcha = isshow => ({
    type:actionType.LOGIN_CAPTCHA,
    isshow
})

export const loginPost = (uname,upasswd,captcha) => dispatch => {
    const params = {"name":uname,"password":upasswd};
    if(captcha){
        params["code"] = captcha;
    }
    return ajaxUtil.post(`${__apiRoot}/User/Pub/Index/login`,params,
        (err,res) => {
            if(err){
                dispatch(loginErr(0));
            }
            if(res && res.body){
                if(res.body.success){
                    dispatch(postLoginin(res.body))
                }else{
                    dispatch(loginErr(2));
                    console.log(res.body);
                    if(res.body.status && res.body.status.type 
                        && res.body.status.type === "needValiCode"){//是否需要显示验证码
                            dispatch(logincaptcha(true));
                    }
                }
            }else{
                dispatch(loginErr(0));
            }
        }
    )
}
