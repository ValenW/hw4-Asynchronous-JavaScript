/**
 * 
 * @Author  : ValenW
 * @Link    : https://github.com/ValenW
 * @Email   : ValenW@qq.com
 * @Date    : 2015-03-25 22:07:20
 * @Last Modified by:   ValenW
 * @Last Modified time: 2015-03-29 12:05:31
 */

function $(id) {
    return document.getElementById(id);
}

function $c(classname) {
    return document.getElementsByClassName(classname);
}

function ajax(url, fnSucc, fnFaild, fnThen) {
    var Ajax = new XMLHttpRequest();
    Ajax.open('GET', url, true);
    Ajax.send();
    Ajax.onreadystatechange = function() {
        if(Ajax.readyState == 4)
            if(Ajax.status == 200)
                fnSucc(Ajax.responseText, fnThen);
            else if(fnFaild)
                    fnFaild();
    };
    globalAjax = Ajax;
}

window.onload = function() {
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++)
        oButton[i].onclick = buttonClick;

    $("at-plus-container").onmouseleave = reset;
    $c("apb")[0].onclick = robot;

    globalAjax = null;
}

function buttonClick(fnThen) {
    if (this.classList.contains("disable") && arguments.length == 0) return;
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++)
        if (oButton[i] !== this)
            oButton[i].classList.add("disable");

    this.childNodes[1].classList.remove("hide");
    this.childNodes[1].classList.add("wait");
    this.childNodes[1].innerHTML = "...";

    ajax("../" + Math.random(), getSucc, getFail, fnThen);
}

function bigButtonClick() {
    var oUnread = $c("unread");
    var sum = 0;
    for (var i = 0; i < oUnread.length; i++)
        sum += parseInt(oUnread[i].innerHTML);

    $("sum").innerHTML = sum;
    this.className = "disable";
}

function getSucc(resp, fnThen) {
    var waitButton = $c("wait")[0].parentNode;
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++)
        if (oButton[i] != waitButton) {
            oButton[i].classList.remove("disable");
            oButton[i].onclick = buttonClick;
        }

    waitButton.childNodes[1].classList.remove("wait");
    waitButton.childNodes[1].innerHTML = resp;
    waitButton.classList.add("disable");

    var oUnreadHide = $c("unread hide");
    var oUnreadWait = $c("unread wait");
    if (oUnreadHide.length + oUnreadWait.length == 0) {
        $("info-bar").className = "able";
        $("info-bar").onclick = bigButtonClick;
    }
    if (typeof(fnThen) == "function") fnThen();
}

function getFail() {
    // alert("Get number failed!");
}

function reset() {
    if (globalAjax != null) globalAjax.abort();
    $c("click-sequ")[0].innerHTML = "";
    $("sum").innerHTML = "";
    $("info-bar").className = "disable";
    $("info-bar").onclick = null;
    var oUnread = $c("unread");
    for (var i = 0; i < oUnread.length; i++)
        oUnread[i].className = "unread hide";

    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++) {
        oButton[i].classList.remove("disable");
        oButton[i].onclick = buttonClick;
    }
}

function robot() {
    reset();
    var oButton = $c("button");
    for (var i = 0; i < oButton.length; i++)
        buttonClick.call(oButton[i], function() {
            if ($("info-bar").onclick != null) $("info-bar").click();
        });
}
