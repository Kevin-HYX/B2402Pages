const main_div = document.getElementById("music_time");

function getWeekStr() {
    let str;
    let week = new Date().getDate()
    if (week === 0) {
        str = "Sun";
    } else if (week === 1) {
        str = "Mon";
    } else if (week === 2) {
        str = "Tue";
    } else if (week === 3) {
        str = "Wed";
    } else if (week === 4) {
        str = "Thur";
    } else if (week === 5) {
        str = "Fri";
    } else if (week === 6) {
        str = "Sat";
    }
    return str
}


//本日新歌
$.ajax({
    type: 'GET',
    url: "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/head.json?v=" + Math.random().toString(),
    async: true,
    dataType: 'json',
    success(response) {
        let sub_div = Object()
        Element.prototype.appendNew = function (name) {
            var newChild = document.createElement(name);
            this.appendChild(newChild)
            return newChild
        };

        response.unshift({
            title: "每日新歌",
            dir_name: getWeekStr()
        })
        //设置先后顺序
        let div_array = []
        for (let i = 0; i < response.length; i++) {
            let di = main_div.appendNew("div")
            di.setAttribute("class", "music_player");

            div_array.push(di)
        }
        //开始异步注入音乐
        /*
         {
         "title": "经典永流传",
         "dir_name": "Classic"
         },
         {
         "name": "Hop"
         },
         */
        for (let i = 0; i < response.length; i++) {
            let url = `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/${response[i].dir_name.toString()}.json?v=${Math.random().toString()}`;
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                dataType: 'json',
                success(res) {
                    //音乐区块总div
                    const block_div = div_array[i];
                    let title = block_div.appendNew("div");
                    title.setAttribute("class","music_title")
                    title.innerText  = response[i].title.toString()

                    for (let j = 0; j < res.length; j++) {
                        let music_div = block_div.appendNew("div")
                        //音乐名
                        let music_name = music_div.appendNew("span")
                        music_name.setAttribute("class", "music_name");
                        music_name.innerText = `${res[j].name.toString()} -`
                        //播放器
                        const audio_span = music_div.appendNew("span")
                        audio_span.setAttribute("class","audio_player")
                        const audio = audio_span.appendNew("audio")
                        audio.setAttribute("controls", "controls");
                        //链接音频
                        const source = audio.appendNew("source")
                        const link = `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/${response[i].dir_name.toString()}/${res[j].name.toString()}.mp3`
                        source.setAttribute("src",link )
                    }
                    block_div.appendNew("hr")
                }
            })
        }

    }
})

