let doc = document.createElement("h1")
doc.innerText = "Hello Editor!"
doc.style.textAlign = 'center'
doc.style.font = "JetBrainsBold"
let scr = document.getElementsByTagName("img")[0]
scr.parentNode.insertBefore(doc, scr)
