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
        // for (let i = 0; i < res.length; i++) {
        //     //播放器所在容器
        //     const music_div = document.createElement("div");
        //     music_div.setAttribute("class", "music_player");
        //     music_div.innerText = res[i].name.toString()
        //     //播放器
        //     const audio = document.createElement("audio");
        //     audio.setAttribute("controls", "controls");
        //     //链接音频
        //     const source = document.createElement("source")
        //     source.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/New/" + res[i].name.toString())
        //
        //     //添加
        //     audio.appendChild(source);
        //     music_div.appendChild(audio)
        //     main_div.appendChild(music_div)
        // }
        // const newHR = document.createElement("hr")
        // main_div.appendChild(newHR)
        // $.ajax({
        //     type: 'GET',
        //     url: "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/old.json?v=" + Math.random().toString(),
        //     async: true,
        //     dataType: 'json',
        //     success(res) {
        //         for (let i = 0; i < res.length; i++) {
        //             //播放器所在容器
        //             const music_div = document.createElement("div");
        //             music_div.setAttribute("class", "music_player");
        //             music_div.innerText = res[i].name.toString()
        //             //播放器
        //             const audio = document.createElement("audio");
        //             audio.setAttribute("controls", "controls");
        //             //链接音频
        //             const source = document.createElement("source")
        //             source.setAttribute("src", "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/Old/" + res[i].name.toString())
        //
        //             //添加
        //             audio.appendChild(source);
        //             music_div.appendChild(audio)
        //             main_div.appendChild(music_div)
        //         }
        //     }
        // })
        response.unshift({
            name: "每日新歌",
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
            //?v=${Math.random().toString()}
            let headURL = `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/${response[i].dir_name.toString()}.json`;
            $.ajax({
                type: 'GET',
                url: headURL,
                async: true,
                dataType: 'json',
                success(res) {
                    //音乐区块总div
                    const block_div = div_array[i];
                    block_div.innerHTML = response[i].title.toString()
                    for (let i = 0; i < res.length; i++) {
                        //播放器
                        const audio = block_div.appendNew("audio")
                        audio.setAttribute("controls", "controls");
                        //链接音频
                        const source = audio.appendNew("source")
                        source.setAttribute("src", `https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/music/${response[i].dir_name.toString()}/${res[i].name.toString()}`)
                    }
                    block_div.appendNew("hr")
                }
            })
        }

    }
})

