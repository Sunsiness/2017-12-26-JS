var utils=(function () {
    var obj = {
        isNumber: "Number",
        isString : "String",
        isBoolean : "Boolean",
        isNull : "Null",
        isUndefined : "Undefined",
        isObject: "Object",
        isArray: "Array",
        isRegExp: "RegExp",
        isFunction:"Function"
    };
    var  checkType = {};
    for(var key  in obj){
        // 当循环isNumber 时，形成一个不销毁的作用域，在这个作用域，保存一个值name;定义了一个函数，赋值给checkType 中isNumber 属性；
        checkType[key] = (function () {
            // 加载执行；作用域不销毁
            var name = obj[key];
            return  function (val) {
                //检测时执行；
                var reg  = new RegExp("\\[object "+name+"\\]");
                return reg.test(Object.prototype.toString.call(val))
            }

        })()
    }
    function getCss(curEle,attr) {
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

    }
    function setCss(curEle,attr,value) {
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
    };
   return {
       checkType:checkType,
       getCss:getCss,
       setCss:setCss
   }



})()