ToDoList 帮你把要做的事情列出来，一项一项，类似思维导图。
最明显的好处是强迫自己整理出任务的每个部分，理顺后按部就班的完成，提高效率。
现在,我们来使用js来做一个todolist

###基本功能
开始的构思是用一个input来输入要做的事情,按钮确定,然后添加的列表,单击列表里的项目,就会使该项目消失,即完成..
于是,写下如下代码:
```html
<body>
<div>
	<input title="todo" id="txt" type="text"/>
	<button id="btn1">TO DO</button>
</div>
<div id="showList" class="show">
</div>
</body>
```

```javascript
var txt = document.getElementById("txt"),
    btn = document.getElementById("btn1"),
    show = document.getElementById("showList");
btn.addEventListener("click", addList, false);

function addList() {
	var list = document.createElement("div");
	list.setAttribute("class", "lists");
	list.innerHTML = txt.value;
	list.addEventListener("click", function xx() {
            if (confirm("这项任务已经完成 ? ")) {
                this.parentNode.removeChild(this);
            }
        }, false);
        show.insertBefore(list, show.childNodes[0]);
}
```
这样就做到了一个简单的todoList,但是这样是远远不够的,如果用户在使用过程中不小心关闭了浏览器,刷新,断电等情况那我们理清的list就白费了,所以我们需要把这些list存储到本地存储中去!

###添加本地存储功能
HTML5 提供了两种在客户端存储数据的新方法：

    localStorage - 没有时间限制的数据存储
    sessionStorage - 针对一个 session 的数据存储

之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。

在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。

对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。

```
localStorage.setItem(key, value);
```
loaclStorage和cookie一样使用键值对的形势保存数据

读取数据时和cookie不同,cookie返回的是一个字符串,localStorage返回的是以个字符串数组:
```
var key = localStorage.key(i),
    val = localStorage[key];
```

接下来给我们的todolist添加本地存储功能,我们把创建每一个list的当前时间作为localStorage的键,内容作为值,并在html里添加一个计数器,用来显示当前list条数

并添加用户点击条目后不是消失,而是变绿并移动到已完成的div中去,使程序的表现更为直观

```javascript
/* 添加到list */
function addList() {
    if (txt.value.trim() != "") {
        var list = document.createElement("div"),
            date = new Date().toLocaleString(),
            time = new Date();
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

/* 小于十前面加0 */
function ten(num){
    if(parseInt(num)<10){
        return "0"+num;
    }else{
        return num;
    }
}
```

###从本地存储载入list
```javascript
/* 读取本地存储中的list */
count.innerHTML = localStorage.length;
for (var i = 0, len = localStorage.length; i < len; i++) {
    var list = document.createElement("div"),
        key = localStorage.key(i),
        val = localStorage[key];
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
```
与addList()大同小异

###添加样式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To Do List</title>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="icon" href="img/icon.gif"/>
</head>
<body>
<div class="header">
    <div id="title">
        <img src="img/title.gif"/>
        <div id="my">—— by Chation</div>
    </div>
</div>
<div class="container">
    <div id="inputList">
        <input title="todo" id="txt" type="text" onkeypress="enterPress(event)"/>
        <button id="btn1">TO DO</button>
    </div>
    <h3>还有 <span id="count" class="warning">0</span> 项未完成</h3>
    <div id="showList" class="show">
    </div>
    <h3>已经完成 <span id="overCount" class="success">0</span> 项</h3>
    <div id="overList" class="show">
    </div>
</div>
<div class="foot">
    <span id="nowTime">Now Time : 00:00:00</span>
</div>
<script src="js/todolist.js"></script>
</body>
</html>
```

```css
.lists{
    padding: 20px;
    margin: 10px;
    background-color: #FFF8BF;
    box-shadow: 5px 4px 10px 2px gray;
    border-left: 10px #4078C0 solid;
}
.overLists{
    padding: 20px;
    margin: 10px;
    background-color: rgba(209, 252, 181,0.5);
    color: #8F8F8F;
    /*box-shadow: 5px 4px 10px 2px gray;*/
    border-left: 10px #4078C0 solid;
}
.show{
    width: 500px;
    margin:0 auto;
}
#inputList{
    width: 392px;
    margin:0 auto;
}
#showList{
    border-bottom: 1px solid #8B8B8B;
    padding-bottom: 20px;
}

.success{
    color: #5CB85C;
}
.warning {
    color: #D9534F;
}

#txt {
    padding: 5px 10px 5px 10px;
    width: 300px;
    font-size: large;
    border: 1px solid #B8B8B8;
}
#txt:focus{
    border:1px solid #3385FF;
}
#btn1{
    width: 70px;
    height: 35px;
    margin-left:-5px;
}

.header{
    height: 50px;
    width: 100%;
    background-color: #bbdad1;
    position: fixed;
    top:0;
}
.container{
    width: 650px;
    margin:100px auto;
    padding: 20px;
    background-color: rgba(190,190,190,0.5);
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;;
}
.foot{
    font-size: large;
    text-align: center;
    width: 200px;
    margin:50px auto;
    padding: 20px;
    background-color: rgba(190,190,190,0.5);
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;;
}
body {
    /*background-color: #F5F5F5;*/
    background-image: url(../img/bg1.png);
    margin:0;
    padding: 0;
}
#my{
    float: right;
    color:#B8B8B8;
    padding: 30px 10px 0 0;
}
```

![这里写图片描述](http://img.blog.csdn.net/20170112141942568?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvQ2hhdGlvbl85OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20170112142005631?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvQ2hhdGlvbl85OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

完整代码GitHub : https://github.com/chation/todolist
