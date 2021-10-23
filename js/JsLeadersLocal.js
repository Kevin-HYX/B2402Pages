function addScriptSynchronously(url){
    document.write("<script src = \""+url+"\"></script>")
}
function addScriptAsynchronously(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}


Synchronously = [


]

Asynchronously = [
    "RandomLines.js",
    "SayHello.js",
]

for (let i = 0, url; i < Synchronously.length; i++) {
    url = Synchronously[i]
    addScriptSynchronously(url)
}

for (let i = 0, url; i < Asynchronously.length; i++) {
    url = Asynchronously[i]
    addScriptAsynchronously(url)
}

