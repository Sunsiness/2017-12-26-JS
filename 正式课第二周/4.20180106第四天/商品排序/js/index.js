// 1. 获取数据
     // ajax 1)创建ajax对象 2）打开路径文件  3）监听数据  4）发送请求
// 2.绑定数据
     // [] 循环结合es6模板字符串 ，向页面中新增内容（li）

//3.循环绑定点击事件

// 4.排序
    //1)类数组转数组
    // 2) sort
    // 3) 重新添加到页面中

var  data;
var list =document.getElementById("oul");
var  nav = document.getElementsByTagName("a");

var xhr = new XMLHttpRequest();
xhr.open("get","json/product.json",false);
xhr.onreadystatechange = function(){
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText);
    }
};
xhr.send(null);
console.log(data);


// 绑定数据
var str = ``;
for(var i=0;i<data.length;i++){
    var cur = data[i];
    str += `<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
          <img src="${cur.img}" alt="">
          <span>${cur.title}</span>
          <span>${cur.time}</span>
          <span>${cur.hot}</span>
          <span>${cur.price}</span>
    </li>`
};
list.innerHTML = str;
// 3.循环绑定点击事件
for(var i=0;i<nav.length;i++){
    nav[i].index = i;
    nav[i].flag = -1;// 1
    nav[i].onclick = function () {

        this.flag *=-1;
        // this-->nav[i]
        sortList.call(this)

    }
}
// 4.排序
var oLis = document.getElementsByTagName("li");
function sortList() {
    // this --->
    var that = this;
    var  ary = utils.toArray(oLis);//[li,li,li]
    var dataAry = ["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        // a,b --->
        // 通过getAttribute获取自定义属性的属性值，如果这个属性不存在，获取的结果是null；
        var  cur = a.getAttribute(dataAry[that.index]);
        var  nex = b.getAttribute(dataAry[that.index]);
        if(that.index===0){
            cur =cur.replace("-","").replace("-","");
            nex =nex.replace("-","").replace("-","")
        }
        return (cur-nex)*that.flag;
    });

    var frg =document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        var  curLi = ary[i];
        frg.appendChild(curLi)
    };
    list.appendChild(frg);
    frg = null;
}


