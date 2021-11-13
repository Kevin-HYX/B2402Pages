// noinspection SpellCheckingInspection

/**
 * 用于加密拉取文件
 * 实验室专用
 * 加密script的标签是 secretscript
 * 加密css的标签是 secretstyle
 * 只有完成验证的机器可以访问
 * 改文件应该与通用Loader一起使用,并将其作为最后一个文件
 * 必须在该文件之前引用jQuery
 */
{
    let scripts = []
    let csss = []
    $("secretscript").each(function (sec, tag) {
        scripts.push(tag.innerText)
    })
    $("secretstyle").each(function (tag) {
        csss.push(tag.innerText)
    })


    /**
     * @param url
     */
    function addScriptAsynchronously(url) {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.head.appendChild(script);
    }

    function addCssAsynchronously(url) {
        let css_element = document.createElement('link');
        css_element.setAttribute('rel', 'stylesheet');
        css_element.setAttribute('href', url);
        document.head.appendChild(css_element);
    }

    // if (typeof (Storage) !== undefined) {
    //     if (localStorage.getItem("authorized") === "true") {
    //         if (// 授权未过期
    //             parseInt(localStorage.getItem("authorizing_time")) >= new Date().getTime()
    //         ) {
    //             do_lead()
    //         } else {
    //             //授权过期,撤销授权
    //             localStorage.setItem("authorized", "false")
    //         }
    //     }
    // }
    // if (localStorage.getItem("authorized") !== "true") {
        let queue = ""
        let width = window.innerWidth
        let height = window.innerHeight
        $("body").click(function (e) {
            let mousey = e.clientY;
            let mousex = e.clientX;
            let x_val = Math.ceil(mousex * 3 / width)
            let y_val = Math.ceil(mousey * 3 / height) - 1
            queue = queue + (x_val + y_val * 3 ).toString()
            console.log(queue)
            if (queue.endsWith("31415926")) {
                console.log("success")
                do_lead()
                localStorage.setItem("authorized", "true")
                localStorage.setItem("authorizing_time", (new Date().getTime() + 30 * 60 * 1000).toString())
                $(this).unbind("click")

            }
        })

    // }


    function do_lead() {
        for (let i = 0, url; i < csss.length; i++) {
            url = csss[i]
            addCssAsynchronously(url + "?v=" + Math.random().toString())
        }
        for (let i = 0, url; i < scripts.length; i++) {
            url = scripts[i]
            addScriptAsynchronously(url + "?v=" + Math.random().toString())
        }
    }

}