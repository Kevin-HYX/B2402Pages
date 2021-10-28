//画布的宽
let width;
//画布的高
let height;
//灰色点的集合
let points_set = [];
var random = Math.random;


/**
 * 从得到指定元素的特定属性
 * @param element 相关的元素
 * @param attribute 要得到的属性
 * @param default_value 如果没有属性，则默认为
 * @returns {string} 需要的属性
 */

/**
 * 通过标签名查找元素
 * @param name 标签名
 * @returns {HTMLCollectionOf<*>} 所有运用此标签的元素的集合
 */
function getEleByTagName(name) {
    return document.getElementsByTagName(name)
}

/**
 * 生成配置对象，包含四个数据
 * @returns {{color: string, opacity: number, zIndex: number, point_count: number}} 配置对象
 */
function getConfigurations() {
    return
}

const canvasElement = document.createElement("canvas");

//设置画布的宽高，并将其赋值到width和height
function set_size() {
    width = canvasElement.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    height = canvasElement.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
}


const context = canvasElement.getContext("2d");

const frameRequest = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (i) {
        window.setTimeout(i, 1000 / 45)
    };

function update() {
    context.clearRect(0, 0, width, height);
    let thisPoint;
    for (let i = 0; i < points_set.length - 1; i++) {
        thisPoint = points_set[i]
        thisPoint.x += thisPoint.xa;
        thisPoint.y += thisPoint.ya;
        //超出边界，速度取反
        thisPoint.xa *= ((thisPoint.x > width || thisPoint.x < 0) ? -1 : 1);
        thisPoint.ya *= ((thisPoint.y > height || thisPoint.y < 0) ? -1 : 1);
        //灰色的点
        for (let j = i + 1; j < points_set.length; j++) {
            let thatPoint = points_set[j];
            let x_dis = thisPoint.x - thatPoint.x;
            let y_dis = thisPoint.y - thatPoint.y;
            let distance = x_dis * x_dis + y_dis * y_dis;
            if (distance < 25000) {
                context.beginPath()
                context.lineWidth = 1 - distance / 25000
                context.moveTo(thisPoint.x, thisPoint.y)
                context.lineTo(thatPoint.x, thatPoint.y)
                context.stroke()
            }
        }
    }
    frameRequest(update)
}

set_size()

const config = {
    zIndex: -1,
    opacity: 0.5,
    color: "0,0,0",
    point_count: width * height / 25000
};
canvasElement.id = "random_lines";
document.body.appendChild(canvasElement);
window.onresize = set_size;
for (let p = 0; config.point_count > p; p++) {
    const x  = random() * width,
          y  = random() * height,
          vx = 2 * random() - 1,
          vy = 2 * random() - 1;
    points_set.push({
        x: x,
        y: y,
        xa: vx,
        ya: vy,
    })
}
update()
