/**
 * 
 * @Author  : ValenW
 * @Link    : https://github.com/ValenW
 * @Email   : ValenW@qq.com
 * @Date    : 2015-03-25 22:07:20
 * @Last Modified by:   ValenW
 * @Last Modified time: 2015-03-28 18:14:10
 */

function $(id) {
    return document.getElementById(id);
}

function $t(tag) {
    return document.getElementsByTagName(tag);
}

function $n(name) {
    return document.getElementsByName(name);
}

function $c(classname) {
    return document.getElementsByClassName(classname);
}

function ajax(url, fnSucc, fnFaild) {
    //1.创建对象
    var oAjax = new XMLHttpRequest();

    //2.连接服务器  
    oAjax.open('GET', url, true);
      
    //3.发送请求  
    oAjax.send();

    //4.接收返回
    oAjax.onreadystatechange = function() {  //OnReadyStateChange事件
        if(oAjax.readyState == 4)  //4为完成
            if(oAjax.status == 200)    //200为成功
                fnSucc(oAjax.responseText);
            else if(fnFaild)
                    fnFaild();
    };
}

window.onload = function() {
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++)
        oButton[i].onclick = buttonClick;
    $("at-plus-container").addEventListener('mouseleave', reset);
}

function buttonClick() {
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++) {
        if (oButton[i].className != this.className) {
            oButton[i].className += " nopress";
            oButton[i].onclick = null;
        }
    }
    this.childNodes[1].className = "unread wait";
    this.childNodes[1].innerHTML = "...";

    ajax("../", getSucc, getFail);
}

function bigButtonClick() {
    var oUnread = $c("unread");
    var sum = 0;
    for (var i = 0; i < oUnread.length; i++)
        sum += parseInt(oUnread[i].innerHTML);
    $("sum").innerHTML = sum;
    this.className = "nopress";
}

function getSucc(resp) {
    var waitB = $c("wait")[0].parentNode;
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++) {
        if (oButton[i].className != waitB.className) {
            oButton[i].className = oButton[i].className.replace(/ nopress/g, "");
            oButton[i].onclick = buttonClick;
        }
    }
    waitB.childNodes[1].className = "unread";
    waitB.childNodes[1].innerHTML = resp;
    waitB.className += " nopress";
    waitB.onclick = null;

    var oUnread = $c("unread hide");
    if (oUnread.length == 0) {
        $("info-bar").className = "press";
        $("info-bar").onclick = bigButtonClick;
    }
}

function getFail() {
    alert("Get number failed!");
}

function reset() {
    $("sum").innerHTML = "";
    $("info-bar").className = "nopress";
    var oUnread = $c("unread");
    for (var i = 0; i < oUnread.length; i++)
        oUnread[i].className = "unread hide";
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++) {
        oButton[i].className = oButton[i].className.replace(/ nopress/g, "");
        oButton[i].onclick = buttonClick;
    }
}
