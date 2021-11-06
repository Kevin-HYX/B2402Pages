function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}

const text_time = document.getElementById("time");
const text_day = document.getElementById("day");
const newTime = new Date('2021/11/10 08:00:00').getTime();

function getDate() {

    const oldTime = new Date().getTime();
    let second = (newTime - oldTime) / 1000;
    const day_left = Math.floor(second / 86400);
    second -= day_left * 86400;
    const hour_left = Math.floor(second / 3600);
    second -= hour_left * 3600;
    const minute_left = Math.floor(second / 60);
    second -= minute_left * 60;
    second = Math.floor(second * 100) / 100
    let secondstr = second.toString()
    if (secondstr.indexOf(".") === -1) secondstr = secondstr + "."
    if (second < 10) {
        while (secondstr.length < 4) secondstr = secondstr + "0"
    } else {
        while (secondstr.length < 5) secondstr = secondstr + "0"
    }
    text_day.innerHTML = tow(day_left) + '天';
    text_time.innerHTML = tow(hour_left) + '小时' + tow(minute_left) + '分钟' + secondstr + '秒';
}

getDate()
setInterval(getDate, 204);


