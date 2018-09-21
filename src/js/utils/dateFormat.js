const dateFormat = {

    format(datex, format) {
        var date = {
            "M+": datex.getMonth() + 1,
            "d+": datex.getDate(),
            "h+": datex.getHours(),
            "m+": datex.getMinutes(),
            "s+": datex.getSeconds(),
            "q+": Math.floor((datex.getMonth() + 3) / 3),
            "S+": datex.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (datex.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

};

export default dateFormat;