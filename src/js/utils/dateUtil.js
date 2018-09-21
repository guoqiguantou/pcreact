var dateUtil = {
    /**
     * 毫秒转换友好的显示格式
     * 输出格式：21小时28分钟15秒
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    format(dateStr) {
        if(dateStr === null)
            dateStr = "";
        // 获取当前时间戳
        dateStr = dateStr.replace(/-/g,'/');
        var currentTime = parseInt(new Date().getTime() / 1000);
        var time = parseInt(new Date(dateStr).getTime() / 1000);
        var diffTime = currentTime - time;
        var second = 0;
        var minute = 0;
        var hour = 0;
        if (null != diffTime && "" != diffTime) {
            if (diffTime > 60 && diffTime < 60 * 60) {
                diffTime = parseInt(diffTime / 60.0) + "分钟" + parseInt((parseFloat(diffTime / 60.0) - parseInt(diffTime / 60.0)) * 60) + "秒";
            }
            else if (diffTime >= 60 * 60 && diffTime < 60 * 60 * 24) {
                diffTime = parseInt(diffTime / 3600.0) + "小时" + parseInt((parseFloat(diffTime / 3600.0) -
                    parseInt(diffTime / 3600.0)) * 60) + "分钟";
            }
            else if(diffTime < 60 * 60 * 48){
                diffTime = '昨天';
            }
            else if(diffTime < 60 * 60 * 72){
                diffTime = '前天';
            }
            else {
                //超过1天
                let date = new Date(parseInt(time) * 1000);
                diffTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                //diffTime = parseInt(diffTime) + "秒";
            }
        }
        return diffTime;
    }
}

export default dateUtil;