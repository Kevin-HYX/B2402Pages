let doc = document.createElement("div")
doc.innerText = "Hello, the Administrator!" + "\n" + navigator.userAgent
doc.className = "center_doc"
doc.style.fontFamily = "JetBrainsBold"
let scr = document.getElementsByTagName("img")[0]
scr.parentNode.insertBefore(doc, scr)
