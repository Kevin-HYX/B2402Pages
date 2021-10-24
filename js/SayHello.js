let doc = document.createElement("h1")
doc.innerText = "Hello Editor!"
doc.className = "center_doc"
let scr = document.getElementsByTagName("img")[0]
scr.parentNode.insertBefore(doc, scr)
