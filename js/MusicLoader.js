const main_div = document.getElementById("music_time");
const music_div = document.createElement("div");
music_div.setAttribute("class", "music_player");
const audio = document.createElement("audio");
audio.setAttribute("controls", "controls");
const source = document.createElement("source")
source.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/琵琶行.mp3")
audio.appendChild(source);
music_div.appendChild(audio)
main_div.appendChild(music_div)