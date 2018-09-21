
domUtils.on($G("qqvideo_share_link"), "blur", function(event){
    //doInsert();
});
domUtils.on($G("insertButton"), "click", function(event){
    //doInsert();
});
function doInsert() {
    var share = $G("qqvideo_share_link").value;
    var width = parseInt(document.querySelector(".width").value);
    var height = parseInt(document.querySelector(".height").value);
    console.log(share);
    console.log(/<iframe ([^>]+)>([^>]*)<\/iframe>/.test(share));
    let pat = /<iframe ([^>]+)>([^>]*)<\/iframe>/;
    if(!pat.test(share)) {
        document.querySelector(".error").innerHTML = "链接不合法";
    }else {
        share = share.replace(/width="\d+"/, 'width="'+width+'"');
        share = share.replace(/height="\d+"/, 'height="'+height+'"');
        document.querySelector(".error").innerHTML = "";
        editor.execCommand('qqvideo', share);
    }
}
