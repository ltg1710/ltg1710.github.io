/**
 * Created by seesaw on 2017/9/17.
 */

function getJS(url) {
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.type = "text/javascript";

        if (script.readyState){  //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    resolve('success: '+url);
                }
            };
        } else {  //Others
            script.onload = function(){
                resolve('success: '+url);
            };
        }

        script.onerror = function() {
            reject(Error(url + 'load error!'));
        };

        script.src = url+'?'+'time='+Date.parse(new Date());
        document.body.appendChild(script);
    });
}

function queue(all) {
    return new Promise(function(resolve, reject) {
        return next(all.splice(0, 1))

        function next(f) {
            return getJS(f).then(function (msg) {
                if (all.length == 0 ) {
                    return resolve("all done!");
                }
                return next(all.splice(0, 1));
            })
        }
    });
}

function random() {
    var choices = [
        ["show_room/50.1/circle.js", "show_room/50.1/draft.js"],
        ["show_room/32.1/blob.js", "show_room/32.1/draft.js"]
    ];

    var choice = Math.floor(Math.random()*choices.length);
    console.log("choice:", choice);
    getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.min.js")
        .then(function(msg){
            Promise.all([
                getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.min.js"),
                getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.sound.min.js")])})
        .then(function(msg){
            queue(choices[choice]);
        });
}

/*getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.min.js")
    .then(function(msg){
        Promise.all([
            getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.min.js"),
            getJS("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.sound.min.js")])})
    .then(function(msg){
        return getJS("show_room/50.1/draft.js");
    }).then(function(msg){
        return getJS("show_room/50.1/circle.js");
    })*/

random();
