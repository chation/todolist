/**
 * Created by Chation on 2017/1/10.
 */
var txt = document.getElementById("txt");
var btn = document.getElementById("btn1");
var show = document.getElementById("showList");
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
    list.innerHTML = key + " ： " + val;
    list.addEventListener("click", function yy() {
        if (confirm("这项任务已经完成 ? ")) {
            this.parentNode.removeChild(this);
            document.getElementById("overList").appendChild(this);
            var countOver = document.getElementById("overCount");
            countOver.innerHTML = parseInt(countOver.innerHTML) + 1;
            this.setAttribute("class", "overLists");
            var count = document.getElementById("count");
            count.innerHTML = parseInt(count.innerHTML) - 1;
            var key = this.getAttribute("data-hex");
            localStorage.removeItem(key);
            this.removeEventListener("click", yy, false);
        }
    }, false);
    show.insertBefore(list, show.childNodes[0]);
}

/* 添加到list */
function addList() {
    if (txt.value.trim() != "") {
        var list = document.createElement("div");
        var date = new Date().toLocaleString();
        var time = new Date();
        list.setAttribute("class", "lists");
        list.innerHTML = ten(time.getHours())+":"+ten(time.getMinutes())+":"+ten(time.getSeconds())+" ： " + txt.value;
        list.setAttribute("data-hex", date);
        localStorage.setItem(date, txt.value);
        list.addEventListener("click", function xx() {
            if (confirm("这项任务已经完成 ? ")) {
                //this.parentNode.removeChild(this);
                document.getElementById("overList").appendChild(this);
                var countOver = document.getElementById("overCount");
                countOver.innerHTML = parseInt(countOver.innerHTML) + 1;
                this.setAttribute("class", "overLists");
                localStorage.removeItem(date);
                var count = document.getElementById("count");
                if (parseInt(count.innerHTML) > 0) {
                    count.innerHTML = parseInt(count.innerHTML) - 1;
                }
                this.removeEventListener("click", xx, false);
            }
        }, false);
        show.insertBefore(list, show.childNodes[0]);
        count.innerHTML = parseInt(count.innerHTML) + 1;
        txt.value = "";
    } else {
        alert("what to do ?!");
    }
}

function ten(num){
    if(parseInt(num)<10){
        return "0"+num;
    }else{
        return num;
    }
}

function enterPress(e) { //使用enter实现同样的功能
    var event = e || window.event;
    if (event.keyCode == 13) {
        addList();
    }
}