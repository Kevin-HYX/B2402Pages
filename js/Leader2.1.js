/**
 * 本文件用于拉起其它Script，以避免Xiaoshinet正则表达式的骚扰
 * 现在能够拉起css和js
 * 兼容性增强了，一个文件，千万用法
 * 全部转换为局部变量
 * 现在可以引入html,控制能力增强了,div的class 为data-div,必须有source
 * 现在可以引入iframe，是一个div,应具有url属性,class必须为superframe
 * 此div是frame的容器
 * 所有的frame超链接都将失效，再也不用担心同学恶搞了
 */



/**
 * @param url
 */
function addScriptAsynchronously(url) {

    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    document.head.appendChild(script);
}

function addCssAsynchronously(url) {
    let css_element = document.createElement('link');
    css_element.setAttribute('rel', 'stylesheet');
    css_element.setAttribute('href', url);
    document.head.appendChild(css_element);
}

/*
 <iframe src="//player.bilibili.com/player.html?aid=60016166&cid=104514776&page=1&danmaku=0" allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" ></iframe>
 */
/**
 * 自动添加iframe
 * iframe自动屏蔽超链接跳转
 * iframe支持全屏
 * iframe的大小等于外部容器的大小,因此其位置,大小完全由外部容器决定
 * @param {String}url iframe 的url
 * @param {Element}container iframe 外部容器,
 * @param {String}open
 * 可选，若为“open”，则取消所有屏蔽,若为"limited"则启动沙盒,若为"disabled",则启动沙盒和遮罩(屏蔽一切点击)
 */
function addFrameAsynchronously(url, container, open) {
    let frame = document.createElement('iframe')
    container.appendChild(frame)
    $(frame).attr("src", url)
            .attr("id", url.length)
            .attr("scrolling", "no")
            .attr("frameborder", "0")
            .attr("framespacing", "0")
            .attr("allowfullscreen", "true")
            .css("z-index", "-1")
            .css("width", "100%")
            .css("height", "100%")

    if (open === "limited") {
        console.log("limited")
        $(frame).attr("sandbox",
            // "allow-top-navigation " +
            "allow-same-origin " +
            "allow-forms " +
            "allow-scripts"
        )
    }
    if (open === "disabled") {
        console.log("disabled")
        $(frame).attr("sandbox",
            // "allow-top-navigation " +
            "allow-same-origin " +
            "allow-forms " +
            "allow-scripts"
        )
        //透明遮罩层技术
        let pu = document.createElement("div")
        $(pu).css("height", "100%")
             .css("width", "100%")
             .css("position", "absolute")
             .css("top", 0)
             .css("left", 0)
             .css("color", "white")
             .css("opacity", 0)
        container.appendChild(pu)
    }
}

{


    let scripts = []
    let csss = [
        "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/css/standard.css"
    ]
    let frames = []
    // if (typeof($)=== undefined){
    //     addScriptAsynchronously("https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/js/jquery-3.5.1.min.js")
    // }

    let divs = document.getElementsByClassName("data-div");
    for (let i = 0; i < divs.length; i++) {
        console.log(i)
        $.ajax({
            type: "GET",
            url: divs[i].getAttribute("source") + `?v=${Math.random().toString}`,
            async: false,
            dataType: "html",
            success: function (response) {

                divs[i].innerHTML = response
            }
        })
    }

//根据网页内容<superlink>自动添加
    let url;
    for (let element of document.getElementsByClassName("superframe")) {
        url = element.getAttribute("url")
        addFrameAsynchronously(url, element, element.getAttribute("open"))
    }
    for (let element of document.getElementsByTagName("superlink")) {
        url = element.textContent
        scripts.push(url)
    }
    for (let element of document.getElementsByTagName("superstyle")) {
        url = element.textContent
        csss.push(url)
    }

    for (let i = 0, url; i < csss.length; i++) {
        url = csss[i];
        addCssAsynchronously(url + "?v=" + Math.random().toString());
    }
    for (let i = 0, url; i < scripts.length; i++) {
        url = scripts[i]
        // + "?v=" + Math.random().toString()
        addScriptAsynchronously(url)
    }


}
