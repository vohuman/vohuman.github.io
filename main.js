var language=false;

var getUrlParameter = function getUrlParameter(parameterName) {
    let result = null,
        tmp = [];
    let items = window.location.search.substring(1).split("=");

    if (items[0] === parameterName)
        result = decodeURIComponent(items[1]);
    return result;
};

menuclicked = function (s) {

    showhide();

    if (s) {
        $(".navoverlay").css("width", "100%");
        $("main").addClass("is-menu-visible");
    }
    else {
        $(".navoverlay").css("width", "0%");
        $("main").removeClass("is-menu-visible");
    }
 }

enmenuclicked = function () {

language = true;
menuclicked(0);

}

demenuclicked = function () {

language = false;
menuclicked(0);

}


langmenuclicked = function () {

    language = !language;
    menuclicked(0);
}


showhide = function() {

    if(language) {
        $('.langDe').fadeOut(700, function(){
            $('.langEn').fadeIn(700);
        });

    }
    else {
        $('.langEn').fadeOut(700, function(){
            $('.langDe').fadeIn(700);
        });
    }
}

function readlang() {

   $.ajax({
       type: "GET" ,
       url: "../data/lang.xml" ,
       dataType: "xml" ,
       success: function(xml) {
            var xmlDoc = $.parseXML(xml),
            $xml = $(xmlDoc);
            $xml.find('lang').each(function () {
                let t=$(this).text();
                console.log(t);
                let r = false;
                if(t === 'true')
                    r = true;
                language = r;
                showhide()
            });
   }});

}

function writelata(l){

    let lang = l;

    $.ajax({
        type: "GET",
        dataType : 'json',
        async: false,
        url: "../data/read.php",
        data: { data: JSON.stringify(lang) },
        success: function (r) {
            console.log(r);
            console.log("Thanks!");
        },
        failure: function(e) {
            console.log("Error: "+ e);
            alert("Error!");
        }
    });

}

changelange = function () {

    language = !language;

    showhide();

    changel(language);
}

contactmousemouve = function (i) {

    var e = $('.typing' + i);
    var tt = '';
    if (i == 1)
        tt = '+4917655568384';
    else if (i == 2)
        tt = 'bahman.soltani@gmail.com';
    else if (i == 3)
        tt = 'linkedin.com/in/vohuman';
    else if (i == 4)
        tt = 'bahman.soltani1';

    var html = tt,
        txt = e.text(),
        txtLen = html.length + 1,
        timeOut,
        char = 0;

    e.text('|');

    (function typeIt() {
        var b = Math.round(Math.random() * (200 - 30)) + 30;
        timeOut = setTimeout(function () {
            char++;
            var type = html.substring(0, char);
            e.html(type + '|');
            typeIt();

            if (char == txtLen) {
                e.html(e.html().slice(0, -1));
                clearTimeout(timeOut);
            }

        }, b);
    }());

}

