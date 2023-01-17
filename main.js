menuclicked = function (s) {
    if (s) {
        $("#myNav").css("width", "100%");
        $("main").addClass("is-menu-visible");
    }
    else {
        $("#myNav").css("width", "0%");
        $("main").removeClass("is-menu-visible");
    }
}

//$(".contactitem").hover(function (e) {
//    if (!e.hasClass("typing"))
//        e.addClass("typing");
//})

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if(checkCookie){
    $("#langDe").hide();
    $("#langEn").show();
    setCookie('lang', 'EN', 1);
}

function checkCookie() {
  let l = getCookie("lang");
    if (l != "" && l != null && l != undefined) {
      return true;
    else
      return false;
}

changelange = function () {
    if(!$.cookie('lang')) {
        var lang = $.cookie('lang');
        if(lang == "DE") {
            $("#langDe").hide();
            $("#langEn").show();
            $.cookie('lang', 'EN');
        }
        if(lang == "EN") {
            $("#langEn").hide();
            $("#langDe").show();
            $.cookie('lang', 'DE');
        }
    }
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




