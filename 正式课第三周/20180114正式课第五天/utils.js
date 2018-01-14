var utils ={
    win:function (attr,value) {
        // 一个参数，是获取值；
        if(typeof value === "undefined"){
            return document.documentElement[attr] || document.body[attr];
        };
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    getCss:function (curEle,attr) {
        var val;
        if("getComputedStyle" in window){
            val = getComputedStyle(curEle)[attr];
        }else{
            if(attr === "opacity"){
                var  value = curEle.currentStyle["filter"];
                var  reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/g;
                if(!value){
                    val = 1;
                }else{
                    val = reg.exec(value)[1]/100;
                }
            }else{
                val= curEle.currentStyle[attr];
            }

        }
        val = parseFloat(val);
        return val;

    },
    setCss:function setCss(curEle,attr,value) {
    if(attr==="opacity"){
        curEle.style["opacity"] = value;
        curEle.style["filter"] = "alpha(opacity="+value*100+")";
        return;
    }
    var  reg = /^(width|height|((margin|padding)?(left|rigth|bottom|top)?))$/i;
    if(reg.test(attr)&&!isNaN(value)){
        value = value + "px";
    }
    curEle.style[attr] = value;
 },
    offset:function (curEle) {
        var  p = curEle.offsetParent;
        var  l = curEle.offsetLeft;
        var  t = curEle.offsetTop;
        while(p.nodeName !== "BODY"){
            var reg = /MSIE 8.0/;
            if(!reg.test(navigator.userAgent)){
                l+= p.clientLeft;
                t+=p.clientTop;
            }
            l+= p.offsetLeft;
            t+= p.offsetTop;
            p = p.offsetParent;

        };
        return {l :l,t:t};
    },

     toJSON:function (val) {
         return  "JSON"  in window?JSON.parse(val) : eval("("+val+")")
     }

}
