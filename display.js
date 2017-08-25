//looks more professional
(window.Display = function (
    op = {
        projs: [
            {
                title: "BookingSystem"
                , about: "beautiful Booking System for you!"
            }
            , {
                title: "Chess"
                , about: "you can play with yourshelf"
            }
            , {
                title: "Chess"
                , about: "you can play with yourshelf"
            }
            , {
                title: "Chess"
                , about: "you can play with yourshelf"
            }
        ]
    }
) {
    var mozila = {
        getImage(){
            // <span xmlns="http://www.w3.org/1999/xhtml" class="newtab-thumbnail thumbnail" style="background-image: url(&quot;moz-page-thumb://thumbnail/?url=https%3A%2F%2Fwww.suibiji.com%2F%23%2Fnote%2Fnew&amp;revision=567&quot;);"></span>
        }
    }
    var flu = {
        createProjs(
            op = {
                projs: []
                , width: 3
            }
        ) {
            var rus = {};
            op.projs.forEach((v, i) => {
                //add  one tr
                //利用标记,使得一行三个 更易实现了
                var trStr = Math.floor(i / op.width) + "; .tr"
                var oneTr = rus[trStr] || (rus[trStr] = {});

                //add one proj
                oneTr[i + "; .onep"] = {
                    h2: v.title
                    , ".desc": v.about
                }
            })
            return rus;
        }
    }
    var eoyo = Vir({
        "h3": "Welcome to Eoyo's GitHub Page!"
        , ".content": flu.createProjs({
            width: 3
            , projs: op.projs
        })
    })
})();