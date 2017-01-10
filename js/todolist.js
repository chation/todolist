/**
 * Created by Chation on 2017/1/10.
 */
var txt = document.getElementById("txt");
var btn = document.getElementById("btn1");
var show = document.getElementById("showList");
var over = document.getElementById("overList");
var count = document.getElementById("count");
btn.addEventListener("click", addList, false);

/* 读取本地存储中的list */
count.innerHTML = localStorage.length;
for (var i = 0, len = localStorage.length; i < len; i++) {
    var list = document.createElement("div");
    var key = localStorage.key(i);
    var val = localStorage[key];
    list.setAttribute("class", "lists");
    list.setAttribute("data-hex", key);
    list.innerHTML = key + " : " + val;
    list.addEventListener("click", function () {
        this.parentNode.removeChild(this);
        var count = document.getElementById("count");
        count.innerHTML = parseInt(count.innerHTML) - 1;
        var key = this.getAttribute("data-hex");
        localStorage.removeItem(key);
    }, false);
    show.insertBefore(list, show.childNodes[0]);
}

/* 添加到list */
function addList() {
    if (txt.value.trim() != "") {
        var list = document.createElement("div");
        var date = new Date().toLocaleString();
        list.setAttribute("class", "lists");
        list.innerHTML = date + " : " + txt.value;
        list.setAttribute("data-hex", date);
        localStorage.setItem(date, txt.value);
        list.addEventListener("click", function () {
            this.parentNode.removeChild(this);
            localStorage.removeItem(date);
            var count = document.getElementById("count");
            count.innerHTML = parseInt(count.innerHTML) - 1;
        }, false);
        show.insertBefore(list, show.childNodes[0]);
        count.innerHTML = parseInt(count.innerHTML) + 1;
    }else{
        alert("what to do ?!");
    }
}
