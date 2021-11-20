{
    let last_press = 0
    $(document).ready(function () {
        $(document).mousemove(function () {
            console.log("C")
            last_press = new Date().getTime()
            $("#front_face,#gallery-wrapper,.menu_fix").animate({opacity: 1.0},1000)
            $("#back_face").animate({opacity: 0.1},1000)
        })
    })
/*
20-30S未点击,则将透明度调为0
 */
    setInterval(function () {
        let nowTime = new Date().getTime()
        if (nowTime-last_press > 20000){
            $("#front_face,#gallery-wrapper,.menu_fix").animate({opacity:0},1000)
            $("#back_face").animate({opacity:1.0},1000)
        }
    },20000)
}