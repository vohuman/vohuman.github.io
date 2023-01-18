var language=true;

var getUrlParameter = function getUrlParameter(sParam) {
    let result = null,
        tmp = [];
    let items =location.search.substring(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
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

        $.ajax({
            method: 'GET',
            url: '../data/read.html?lang='+language.toString(),
            success : function(r) {

            }
        });
    }
    else {
        $('.langEn').fadeOut(700, function(){
            $('.langDe').fadeIn(700);
        });

        $.ajax({
            method: 'GET',
            url: '../data/read.html?lang='+language.toString(),
            success : function(r) {

            }
        });
    }


}

function readlang() {

    let d = getUrlParameter('lang');
    console.log(d);
    let lang = '';
    $.getJSON( "../data/lang.json", function( data ) {
      var items = [];
      console.log(data);
      lang = data[0].lang;
      $.each( data, function( key, val ) {
        //items.push( "<li id='" + key + "'>" + val + "</li>" );
      });

    });
    console.log(lang);
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

