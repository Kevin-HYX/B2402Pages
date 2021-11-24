const main_div = document.getElementById("music_time");
const today = new Date()

String.prototype.hashCode = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

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
                        //title

                        let music_name = music_div.appendNew("span")
                        music_name.setAttribute("class", "music_name");
                        music_name.innerText = `${res[j].name.toString()} -`


                        //播放器
                        const audio = music_div.appendNew("audio")
                        $(audio).attr("controls", "controls")
                                .attr("id", "Music" + res[j].name.toString().hashCode())

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
        //自动连续
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
 自动在中断处重播
 每秒钟都会进行记录
 */

$(function (){
    /*
     time:记录最后更新的时间
     id:音频的唯一id
     seek:最新的进度
     */
    const information_JSON = localStorage.getItem("pauseInformation");
    //存在记录
    if (information_JSON !== null && information_JSON!=="undefined") {
        const information = JSON.parse(information_JSON)
        //停止前记录的时间
        let time = information.time
        let id = information.id
        let seek = information.seek
        //30s后过期
        if (time + 30000 > new Date().getTime()) {
            //没过期,设置
            let target_audio = $(`#${id}`)[0];
            target_audio.currentTime = seek
            target_audio.preload = "auto"
            // target_audio.autoplay = true
            target_audio.play()
        } else {
            //过期,清除记录
            localStorage.setItem("pauseInformation", undefined)
        }
    }



    /**
     * 返回当前正在播放的audio
     * @returns {HTMLAudioElement}
     */
    function getCurrentlyPlayingAudio() {
        const audios = document.getElementsByTagName("audio")
        for (let i = 0;i < audios.length;i++) {

            if (!audios[i].paused) {
                return audios[i];
            }
        }
    }

    function record() {
        let current = getCurrentlyPlayingAudio()
        if (current !== undefined) {
            const record = {
                id: current.id,
                time: new Date().getTime(),
                seek: current.currentTime
            }
            localStorage.setItem("pauseInformation", JSON.stringify(record))
        }
    }
    record()
    setInterval(record, 500)

    $("audio").on("pause",function () {
        localStorage.setItem("pauseInformation", JSON.stringify(record))
    })
})
