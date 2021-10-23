/**
 * 本文件用于拉起其它Script，以避免Xiaoshinet正则表达式的骚扰
 */

/*
同步添加的放这里
 */
Synchronously = []
/*
异步添加的放这里
 */
Asynchronously = []

//根据网页内容<superlink>自动添加


/**
 * 同步添加，容易造成卡顿，但是可以在script中使用<code>document.write()</code>
 * @param url
 */
function addScriptSynchronously(url) {
    document.write("<script src = \"" + url + "\"></script>")
}

/**
 * 异步添加，不容易造成卡顿。由于document流已经关闭，不能使用<code>document.write()</code>，
 * @param url
 */
function addScriptAsynchronously(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}


for (let i = 0, url; i < Synchronously.length; i++) {
    url = Synchronously[i]
    addScriptSynchronously("https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/" + url)
}

for (let i = 0, url; i < Asynchronously.length; i++) {
    url = Asynchronously[i]
    addScriptAsynchronously("https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/" + url)
}


