import ajaxUtil from "./ajaxUtil"
/**
 * 微信工具类
 *
 */
var wxUtil = {
    /**
     * 微信分享方法
     * @param obj
     */
    share(obj){
        wx.ready(function(){
            wx.onMenuShareTimeline(obj);
            wx.onMenuShareAppMessage(obj);
            wx.onMenuShareQQ(obj);
            wx.onMenuShareWeibo(obj);
            wx.onMenuShareQZone(obj);
        });
    },
    /**
     * 微信授权
     * @param param 参数
     * @param callback 回调
     */
    config(param,callback){
        //debug="+debug+"&apis=getNetworkType,onMenuShareTimeline,onMenuShareAppMessage,chooseWXPay,uploadImage,chooseImage,previewImage,downloadImage,getLocalImgData&url="+encodeURIComponent(url.split('#')[0])
        /**
         onMenuShareAppMessage
         onMenuShareWechat
         startRecord
         stopRecord
         onVoiceRecordEnd
         playVoice
         pauseVoice
         stopVoice
         onVoicePlayEnd
         uploadVoice
         downloadVoice
         chooseImage
         previewImage
         uploadImage
         downloadImage
         previewFile
         getNetworkType
         openLocation
         getLocation
         onHistoryBack
         hideOptionMenu
         showOptionMenu
         hideMenuItems
         showMenuItems
         hideAllNonBaseMenuItem
         showAllNonBaseMenuItem
         closeWindow
         scanQRCode
         selectEnterpriseContact
         openEnterpriseChat
         chooseInvoice
         */
        ajaxUtil.loadJsonp("http://api.tingshuolive.com/Js/Test/index", param, callback, false);
    },
    /**
     * 分享图片地址处理
     * @param path
     */
    img(path){
        return path ? path.indexOf("http") == 0 ? path: __imgRoot+path: setting.logo;
    }
}
export default wxUtil;
