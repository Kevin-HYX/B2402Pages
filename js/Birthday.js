/*
 本文件负责驱动生日组件
 */
{
    let bank = $("#normal_birthday")
    $.ajax({
        type: "GET",
        url: "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/json/birthday.json",
        async: true,
        dataType: "json",
        success: function (data) {

            random = function (count) {
                return Math.ceil(Math.random() * count)
            }
            let this_month = []
            for (let i = 0; i < data.length; i++) {
                if (Number.parseInt(data[i].month) === new Date().getMonth() + 1) {
                    this_month.push(data[i])
                }
            }
            let i = 0
            if (this_month) {
                function f () {
                    bank.text(this_month[i++].name)
                        .animate({opacity: 1},
                            1000,
                            function () {
                                setTimeout(function () {
                                    bank.text(data[random(data.length).name])
                                        .animate({opacity: 0}, 1000)
                                }, 2000)
                            })
                    if (i === this_month.length) i = 0
                }
                f()
                setInterval(f, 5000)
            }
        }
    })
}