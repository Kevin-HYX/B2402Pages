/*
 本文件专用于表情包专辑
 */

count = 4
let container = document.getElementById("picture_container");
const br = document.createElement("br")
for (let i = 1, str; i <= count; i++) {
    const emoji = document.createElement("img");
    emoji.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/image/emojis/" + Number(i) + ".jpg")
    container.appendChild(emoji)
    container.appendChild(br)
}