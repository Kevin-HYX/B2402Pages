function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}

const text_time = document.getElementById("time");
const newTime = new Date('2024/06/07 00:00:00').getTime();
const oldTime = new Date().getTime();
const text_day = document.getElementById("day");

function getDate() {
    let second = Math.floor((newTime - oldTime) / 1000);
    const day_left = Math.floor(second / 86400);
    second = second % 86400;
    const hour_left = Math.floor(second / 3600);
    second %= 3600;
    const minute_left = Math.floor(second / 60);
    second %= 60;
    text_day.innerHTML = tow(day_left) + '天';
    text_time.innerHTML = tow(hour_left) + '小时' + tow(minute_left) + '分钟' + tow(second) + '秒';
    setInterval(getDate, 1000);
}

getDate();

