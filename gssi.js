//icon ,html,picture..etc data:
var icons = {
    search: `<svg viewBox="0 0 16 16" class="Icon Icon--search" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><title></title><g><path d="M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z"></path></g></svg>`
}

//old style data
var mainProjs = [
    {
        title: "Booking System"
        , about: "To be honest ,it is just a table not a system."
        , link: "./Booking"
    }
    , {
        title: "Vir.js"
        , about: "use javascript to write html"
        , list: [
            "separated data from document"
            , "<a href = './display.js' >this page</a> is write with vir.js"
            , "Dom is you create ,jquery could go away!"
        ]
        , link: "./Vir"
    }
    , {
        title: "Chess"
        , about: "left hand play with right hand"
        , list: [
            "old fashion"
            , "you can't play online with others because of github page"
        ]
        , link: "./fiveGame"
    }
    , {
        title: "Chess"
        , about: "you can play with yourshelf"
    }
    , {
        title: "vitalSvg.js"
        , about: "create sample SVG with js"
        , list: [
            "SVG , CAD"
            , "So amazing!"
        ]
        , link: "./svg&file/builder.html"
    }
]


//数据 base url::F:\Proj\express\public\index.html
var mdt = {
    items: [
        {
            title: "Some Vir Proj"
            , list: [
                {
                    icon: ""
                    , href: "./svg&file/vitalSvg.js"
                    , name: "vitalSvg.js"
                    , css: ["./css/vitalSvg.css"]

                    , html: './svg&file/builder.html'
                }
                , {
                    icon: ""
                    , href: "./VirDemo/nor/myRot.js"
                    , name: "myRot.js"
                }
                , {
                    icon: ""
                    , href: ""
                    , name: "vitalSvg.js"
                }
                , {
                    icon: ""
                    , href: ""
                    , name: "vitalSvg.js"
                }
                , {
                    icon: ""
                    , href: ""
                    , name: "vitalSvg.js"
                }
            ]
        }
    ]
    , welcomePage: {

    }
}

//可复用的类  { ###
//小型事件处理;
function EventBar() {
    this.events = {}
}

//方便可以for in 遍历到;
js.extend(EventBar.prototype, {
    emit(evName, ...args) {
        for (var func of this.events[evName]) {
            func.apply(null, args);
        }
    }
    , on(evName, cb) {
        if (this.events[evName]) {
            this.events[evName].push(cb);
        } else {
            this.events[evName] = [];
            this.events[evName].push(cb);
        }
    }
})

//方便操作,创建沙盒dom;
class ShadowRooter {
    constructor(div) {
        this.srcDiv = div;
        this.innerHTML = "";
        //shadow-root; //2017 9 23 only chrome can !;
        if (div.createShadowRoot) {
            this.shaDoc = div.createShadowRoot();
        } else {
            //用 iframe 代替 shadowRoot; //失败!!!
            var im = document.createElement("iframe");
            this.shaDoc = im;
            this.srcDiv.appendChild(this.shaDoc);
            console.log(im);
        }
    }
    addStyle(href) {
        var str = ""
        switch (typeof href) {
            case "string":
                str += `<link rel ='stylesheet' href='${href}'/>`
                break;
            case "object":
                for (var x in href) {
                    str += `<link rel ='stylesheet' href='${href[x]}'/>`;
                }
                break;
        }
        this.innerHTML += str;
    }
    addDiv(div) {
        if (this.shaDoc.tagName === "IFRAME") {
            this.shaDoc.src = "data:text/html," + this.innerHTML;
            this.shaDoc.onload = function () {
                console.log(this);
            }
        } else {
            if (!div) {
                console.log("Can't add this one!:" + div);
                return;
            }
            this.shaDoc.innerHTML = this.innerHTML + '<div id="content"></div>';
            this.shaDoc.getElementById("content").appendChild(div);
        }
    }
    static shroot() {
        if (ShadowRooter._is_shroot !== undefined) {
            return ShadowRooter._is_shroot;
        }
        var div = document.createElement("div");
        if (div.createShadowRoot) {
            ShadowRooter._is_shroot = true;
        } else {
            ShadowRooter._is_shroot = false;
        }
        return ShadowRooter._is_shroot;
    }
}
ShadowRooter._is_shroot = undefined;
// ### }


//可独立的功能;
var func = {

    //menu troggle show;
    trog: 1
    , dt: new Data({
        showMenu: true
    })
    , trggoleShow(trog) {
        //.init trog
        if (trog === undefined) {
            trog = func.trog ^ 1;
        }

        func.trog = !!trog;
        func.dt.showMenu.set(!!trog);
        if (func.trog) {
            content.content.className = "content";
        } else {
            content.content.className = "content bigger";
        }
    }
    , clickTroggle: {
        on: {
            click(e) {
                func.trggoleShow();
            }
        }
    }
    , activeBarAt(menu) {
        return {
            class: {
                [menu]: true
                , "active": func.dt.showMenu
            }
        }
    }
    //

    //history head follower;
    , lastTwo: null
    , lastOne: null
    , visited(ele) {
        if (func.lastOne !== null) {
            if (func.lastTwo) {
                func.lastTwo.className = ""
            }
            func.lastOne.className = "visited";
            func.lastTwo = func.lastOne;
        }
        ele.className = "curent";
        func.lastOne = ele;
    }
}


//利用Vir加载文件;
//load only vir js flip;
// @return one Div element that will be use as *context* of href file;
var virLoader = {
    load: Vir.createLoader('now')
    , map: new Map()
    //public
    , getDiv(href, sudo) {
        if (this.map.has(href)) {
            return this.map.get(href);
        } else {
            if (sudo) {
                return this.open(href);
            }
            return null;
        }
    }

    //callback when js is loaded;
    , open(href,cb) {
        if (this.map.has(href)) {
            return;
        }
        //create an new context ,to avoid child contains parent body
        var bkDiv = document.createElement("div");
        if (!href) {
            return bkDiv;
        }
        var bkLoad = Vir(bkDiv, {
            "div ::backgroundDiv": this.load(href,cb)
        })
        // bkDiv.removeChild(bkLoad.backgroundDiv)
        this.map.set(href, bkLoad.backgroundDiv);
        return bkLoad.backgroundDiv
    }
}

//枢纽 menu 与content交流中转站;
var menuToContent = {
    bind(menu, content) {
        menu.on("clickLi", function (e) {
            //尝试打开本地href;
            if (content.show(e.href)) {
                return;
            }

            //支持shadown Root ?
            if (ShadowRooter.shroot()) {
                var srcDiv = document.createElement("div");
                var shaDoc = new ShadowRooter(srcDiv);

                //open  online; if there is one href;
                if (e.href) {
                    virLoader.open(e.href);
                    var div = virLoader.getDiv(e.href , function (){
                        Animate.collect(3,e.href);
                    });
                }

                //check if it is nothing;
                if (div) {
                    shaDoc.addStyle(e.css);
                    shaDoc.addDiv(div);
                } else {
                    var nothing = document.createElement("div");
                    Vir(nothing, {
                        h2: {
                            $: "There is Nothing!"
                        }
                        , style: {
                            padding: "20px"
                            , color: "#eee"
                        }
                    })
                    shaDoc.addDiv(nothing);
                }
            } else {
                srcDiv = document.createElement("div");
                var iframe = document.createElement("iframe");
                // var str = "";
                // var href = e.css;
                // switch (typeof href) {
                //     case "string":
                //         str += `<link rel ='stylesheet' href='${href}'/>`
                //         break;
                //     case "object":
                //         for (var x in href) {
                //             str += `<link rel ='stylesheet' href='${href[x]}'/>`;
                //         }
                //         break;
                // }
                // str += '<script src="'+e.href+'"></script>'
                // iframe.src = "data:text/html,"+str;
                iframe.src = e.html;
                srcDiv.appendChild(iframe);
            }

            //add to content;
            content.add({ href: e.href, div: srcDiv });
            content.show(e.href);
        })
    }
}

//控制content内容显示
var content = {
    content: null
    //store the shadow-root dom;
    , map: new Map()
    , add(op = { href: "", div: null }) {
        if (this.map.has(op.href)) {
            return;
        }
        //add new;
        this.map.set(op.href, op.div);
        op.div.className = "section";

        op.div.style.display = "none";
        this.content.appendChild(op.div);
    }
    //that is curent adding
    , lastOne: null
    , show(href) {
        if (this.map.has(href)) {
            //clear lastOne;
            if (this.lastOne) {
                this.lastOne.style.display = "none";
            }
            //set new
            this.lastOne = this.map.get(href);
            this.lastOne.style.display = "block";
            return true;
        } else {
            return false;
        }
    }
}

//Vir dom 树:
//Vir风格的菜单组件
var menu = {
    from(op = mdt.items) {
        var rus = op.map(v => ({
            "div": {
                ".title": v.title
                , "ul": v.list.map(v => ({
                    "a.wrapA": {
                        args: {
                            href: v.href
                            , on: {
                                click(e) {
                                    e.preventDefault();
                                }
                            }
                        }
                        , "li": {
                            $: v.name
                            , on: {
                                click(e) {
                                    e.preventDefault();
                                    menu.workForHref(v);
                                    func.visited(this);
                                }
                            }
                        }
                    }
                }))
            }
        }))
        rus.args = func.activeBarAt("menu");
        return rus;
    }
    , workForHref(v) {
        this.emit("clickLi", v);
    }
}
js.extend(menu, new EventBar()); //继承EventBar;


var mainDom = {
    ".webPage": {
        $: ``
    }
    , ".head": {
        ".wrap .for-bt": {
            "button .menu-bt": func.clickTroggle
        }
        , ".wrap": {
            ".name": "Welcome to Eoyo's github page!"
            , ".search": {
                "span>input": {
                    args: {
                        value: "123"
                    }
                }
                , "span>button": "搜索"
            }
        }
    }
    , ".menu": menu.from(mdt.items)

    , ".content ::content": {

    }
    , ".foot": {
        ".wrap .talking": {
            $: "赞我"
            , style: {
                cursor: "pointer"
            }
        }
        , ".wrap": {
            $: "呵呵.."
        }
    }
    , ".padge": {

    }
}

Vir([content], mainDom);
menuToContent.bind(menu, content);