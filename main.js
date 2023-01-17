var language=true;

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
/*      if (s) {
//             $(".navoverlayen").show();
//             $(".navoverlayde").hide();
//             $(".navoverlayen").css("width", "0%");
            $(".navoverlayen").css("width", "100%");
            $("main").addClass("is-menu-visible");
      }
      else {
            language = false;
            showhide("EN");
            $(".navoverlayen").css("width", "0%");
            $("main").removeClass("is-menu-visible");
      }*/
}

demenuclicked = function () {

language = false;
menuclicked(0);

/*      if (s) {
//             $(".navoverlayen").show();
//             $(".navoverlayde").hide();
//             $(".navoverlayen").css("width", "0%");
            $(".navoverlayde").css("width", "100%");
            $("main").addClass("is-menu-visible");
      }
      else {
            language = true;
            showhide();
            $(".navoverlayde").css("width", "0%");
            $("main").removeClass("is-menu-visible");
      }*/
}


 langmenuclicked = function (s) {

     showhide();

     if (s) {
         if(language) {
            $(".navoverlay ").css("width", "0%");
            $(".navoverlayen").css("width", "100%");
            $("main").addClass("is-menu-visible");
         }
         else if(l == "DE") {
            $(".navoverlayde").show();
            $(".navoverlayen").hide();
            $(".navoverlayde").css("width", "0%");
            $(".navoverlayde").css("width", "100%");
            $("main").addClass("is-menu-visible");
         }
     }
     else {
         if(l == "EN") {
             $(".navoverlayen").css("width", "0%");
             $("main").removeClass("is-menu-visible");
         }
         else if(l == "DE"){
              $(".navoverlayde").css("width", "0%");
              $("main").removeClass("is-menu-visible");
         }
         $(".navoverlayen").hide();
         $(".navoverlayde").hide();
     }

  }


showhide = function() {

    if(language) {
        $(".langDe").hide();
        $(".langEn").show();
    }
    else {
        $(".langEn").hide();
        $(".langDe").show();
    }
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

