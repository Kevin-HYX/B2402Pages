const main_div = document.getElementById("music_time");


$.ajax({
    type: 'GET',
    url: "http://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/new.json",
    async: true,
    dataType: 'json',
    success(res) {
        for (let i = 0; i < res.length; i++) {
            //播放器所在容器
            const music_div = document.createElement("div");
            music_div.setAttribute("class", "music_player");

            //播放器
            const audio = document.createElement("audio");
            audio.setAttribute("controls", "controls");
            //链接音频
            const source = document.createElement("source")
            source.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/New" + res[i].name.toString())

            //添加
            audio.appendChild(source);
            music_div.appendChild(audio)
            main_div.appendChild(music_div)
        }
    }
})