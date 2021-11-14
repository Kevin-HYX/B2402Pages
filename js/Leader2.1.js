/**
 * 本文件用于拉起其它Script，以避免Xiaoshinet正则表达式的骚扰
 * 现在能够拉起css和js
 * 兼容性增强了，一个文件，千万用法
 * 全部转换为局部变量
 * 现在可以引入html,控制能力增强了
 */
{
    let scripts = []
    let csss = []

    let divs = document.getElementsByClassName("data-div");
    for (let i = 0; i < divs.length; i++) {

        $.ajax({
            type: "GET",
            url: divs[i].getAttribute("source"),
            async: false,
            dataType:"html",
            success: function (response) {

                divs[i].innerHTML = response
            }
        })
    }

//根据网页内容<superlink>自动添加
    let text;
    for (let element of document.getElementsByTagName("superlink")) {
        text = element.textContent
        scripts.push(text)
    }
    for (let element of document.getElementsByTagName("superstyle")) {
        text = element.textContent
        csss.push(text)
    }


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


    for (let i = 0, url; i < csss.length; i++) {
        url = csss[i]
        addCssAsynchronously(url + "?v=" + Math.random().toString())
    }
    for (let i = 0, url; i < scripts.length; i++) {
        url = scripts[i]
        addScriptAsynchronously(url + "?v=" + Math.random().toString())
    }

}