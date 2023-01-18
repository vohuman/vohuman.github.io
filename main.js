var language=true;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    console.log(window.location.search);
    console.log(sPageURL);
    console.log(sURLVariables);
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            console.log(decodeURIComponent(sParameterName[1]));
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
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

        //$(".langDe").fadeOut(500);
        //$(".langEn").hide();

        $('.langDe').fadeOut(750, function(){
            $('.langEn').fadeIn(750);
        });
    }
    else {
        //$(".langEn").fadeOut(500);
        //$(".langDe").hide();

        $('.langEn').fadeOut(750, function(){
            $('.langDe').fadeIn(750);
        });
    }

    $.ajax({
        method: 'GET',
        url: '../data/read.html',
        data: {lang : language},
        success : function(r) {
            console.log(r);
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

