const main_div = document.getElementById("music_time");
const today = new Date()

function getWeekStr() {
    let str;
    let week = today.getDay()
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
    url: `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/head.json?v=${Math.random().toString()}`,
    async: false,
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

        //音频播放器集合
        const musics = []

        for (let i = 0; i < response.length; i++) {
            //update 添加对weekday的控制
            if (
                response[i].week !== undefined
                &&
                response[i].week.indexOf(today.getDay()) === -1
            ) continue


            //音乐div
            let di = main_div.appendNew("div")
            di.setAttribute("class", "music_player");
            div_array.push(di)
            //歌曲请求链接
            let url = `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/${response[i].dir_name.toString()}.json?v=${Math.random().toString()}`;
            $.ajax({
                type: 'GET',
                url: url,
                async: false, //改为同步
                dataType: 'json',
                success(res) {
                    //音乐区块总div
                    const block_div = di;
                    let title = block_div.appendNew("div");
                    title.setAttribute("class", "music_title")
                    title.innerText = response[i].title.toString()

                    for (let j = 0; j < res.length; j++) {
                        let music_div = block_div.appendNew("div")
                        //音乐名
                        let music_name = music_div.appendNew("span")
                        music_name.setAttribute("class", "music_name");
                        music_name.innerText = `${res[j].name.toString()} -`
                        //播放器
                        const audio_span = music_div.appendNew("span")
                        audio_span.setAttribute("class", "audio_player")
                        const audio = audio_span.appendNew("audio")
                        audio.setAttribute("controls", "controls");
                        //链接音频
                        const source = audio.appendNew("source")
                        const link = `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/${response[i].dir_name.toString()}/${res[j].name.toString()}.mp3`
                        source.setAttribute("src", link)

                        musics.push(audio)
                    }
                    block_div.appendNew("hr")
                }
            })
        }
        for (let i = 0; i < musics.length - 1; i++) {
            musics[i].onended = function () {
                musics[i + 1].play()
            }
        }

        for (let i = 0; i < musics.length; i++) {
            //禁止同时播放
            musics[i].onplay = function () {
                for (let j = 0; j < musics.length; j++) {
                    if (j === i) continue

                    musics[j].pause()
                }
            }
        }
    }
})


/*
 用于防止因为刷新导致的中断
 */

