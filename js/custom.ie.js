jQuery.noConflict();

//===   Redirect Old IE Browser   ===//
if ( jQuery.browser.msie ) {
    var version = jQuery.browser.version,
    url = 'ie.html';
    if (version < 10) {
        window.location.href = url;
    }
}

//===   On Ready Functions   ===//
var onready = function () {

    // Get date variable
    var formattedDate = new Date();
    var d = formattedDate.getDate(),
        m = formattedDate.getMonth() + 1, // JavaScript months are 0-11
        y = formattedDate.getFullYear(),
        y = formattedDate.getFullYear(),
        h = formattedDate.getHours(),
        m = formattedDate.getMinutes(),
        s = formattedDate.getSeconds();
        date = y + "" + m + "" + d + "-" + h + "" + m + "" + s;

    // Save a value session
    sessionStorage.id = date + '-' + Math.floor((Math.random() * 100) + 1);
    var session = sessionStorage.id;

    // Auto resize textarea
    //autosize(jQuery('textarea'));
    //jQuery('textarea').elastic();

    // Dial
    jQuery('#jbo-1').typeIt({
        strings: ["Bonjour"],
        speed: 80,
        lifeLike: true,
        cursor: false,
        breakLines: true
    }, function(){
        jQuery('#jbo-1').removeClass('no-answer');
        jQuery('#jbo-2.hide').removeClass('hide');
        jQuery('#jbo-2').typeIt({
            strings: ["Comment vous appelez-vosu", "Comment vous appelez-vous?"],
            speed: 80,
            lifeLike: true,
            cursor: false,
            breakLines: false,
            startDelay: 800
        }, function(){
            jQuery('#jbo-2').removeClass('no-answer');
            jQuery('#guest-1.hide').removeClass('hide').find('.answer-input').focus();
        });
    });

    // Post dial
    jQuery( ".answer-input" ).keypress(function(event) {
        if ( event.which == 13 ) {
            var answer = jQuery(this);

            jQuery.ajax({
                url: "https://docs.google.com/1jyZxoGIH1uk706GbwebHgkmrKqcVne-Poshk2jrVnf4/formResponse",
                data: {"entry.1" : formattedDate, "entry.3" : session, "entry.4": answer.text()},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                        answer.text()
                        //Success message
                    },
                    200: function (){
                        answer.text()
                        //Success Message
                    }
                }
            });

            event.preventDefault();
            console.log( session +" la réponse est : "+ answer.text() );
            answer.attr('contentEditable','false');
            answer.parents('.actor__content').removeClass('no-answer');
        }
    });

    // Modal Exit Banner
    jQuery(document).mousemove(function(e) {
        if(e.pageY <= 5) {
            // Launch MODAL BOX
            jQuery('#footer').addClass('active');
            jQuery('#wrapper').addClass('blured');
        }
    });
    jQuery('#footer .icon-close').on('click',function(){
        jQuery('#footer').removeClass('active');
        jQuery('#wrapper').removeClass('blured');
    });
};
jQuery(document).ready(onready);

//===   On Load Functions   ===//
var onload = function () {
};
jQuery(document).load(onload);

//===   On Resize Functions   ===//
var onresize = function () {
};
jQuery(window).resize(onresize);
