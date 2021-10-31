/*
 本文件专用于表情包专辑
 */

count = 8
let br;
let container = document.getElementsByClassName("picture_container")[0];
for (let i = 1, str; i <= count; i++) {
    const emoji = document.createElement("img");
    emoji.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/image/emojis/" + Number(i) + ".jpg")
    container.appendChild(emoji)
    br = document.createElement("br");
    br = document.createElement("br");
    container.appendChild(br)
}