/**
 * document.write("<script language=javascript src="+url+"></script>");
 * ZG9jdW1lbnQud3JpdGUoIjxzY3JpcHQgbGFuZ3VhZ2U9amF2YXNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9LZXZpbi1IWVgvWFNNYWluUGFnZUIyNDAyL3NyYy9yYW5kb21uZXRzLmpzIj48L3NjcmlwdD4iKQ==
 * 本文件用
 */


// link = "var script = document.createElement('script');script.setAttribute('type','text/javascript');script.setAttribute('src',\"https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/js/JsLeader.js\");document.getElementsByTagName('head')[0].appendChild(script);"
// document.write(btoa(link))
// eval(atob('dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCd0ZXh0L2phdmFzY3JpcHQnKTtzY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvS2V2aW4tSFlYL1hTTWFpblBhZ2VCMjQwMi9zcmMvcmFuZG9tbmV0cy5qcycpO2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTs='))

function addJavaScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

list = [
    "js/RandomLines.js",
    "js/SayHello.js"
]
for (var i = 0; i < list.length; i++) {
    url = list[i]
    addJavaScript("https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/"+url)
}


