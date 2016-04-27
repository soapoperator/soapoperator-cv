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
    // ******************************************
    var formattedDate = new Date();
    var d = formattedDate.getDate(),
        m = formattedDate.getMonth() + 1, // JavaScript months are 0-11
        y = formattedDate.getFullYear(),
        h = formattedDate.getHours(),
        min = formattedDate.getMinutes(),
        s = formattedDate.getSeconds();
        date = y + "" + m + "" + d + "-" + h + "" + min + "" + s;

    // Save a value session
    // ******************************************
    sessionStorage.id = date + '-' + Math.floor((Math.random() * 100) + 1);
    var session = sessionStorage.id;

    // Auto resize textarea
    // ******************************************
    //autosize(jQuery('textarea'));
    //jQuery('textarea').elastic();

    // Dial Function
    // ******************************************
    jQuery('.sequence-1 .actor__content').typeIt({
        strings: ["Bonjour"],
        speed: 80,
        lifeLike: true,
        cursor: false,
        breakLines: true
    }, function(){
        jQuery('.sequence-1 .actor__content').removeClass('no-answer');
        jQuery('.sequence-2').removeClass('hide');
        jQuery('.sequence-2 .actor__content').typeIt({
            strings: ["Comment vous appelez-vosu", "Comment vous appelez-vous?"],
            speed: 80,
            lifeLike: true,
            cursor: false,
            breakLines: false,
            startDelay: 800
        }, function(){
            jQuery('.sequence-2 .actor__content').removeClass('no-answer');
            jQuery('.sequence-2 .guest__content').removeClass('hide').find('.answer-input').focus();
        });
    });

    // Post dial answer Function
    // ******************************************
    // Variable to hold request
    var request;
    // Bind to the submit event of our form
    jQuery( ".answer-input" ).keypress(function(event) {
        if ( event.which == 13 ) {
            var answer = jQuery(this);

            // Abort any pending request
            if (request) {
                request.abort();
            }

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            //answer.attr('contentEditable','false');
            answer.parents('.actor__content').removeClass('no-answer');

            // Fire off the request to /form.php
            request = jQuery.ajax({
                url: "https://script.google.com/macros/s/AKfycbxxFsfN3Oqsvl4SLNmdVqahybsXFTobSpW8iXZfetyhGgB7z28F/exec",
                type: "post",
                data: {"session" : session, "Comment vous appelez-vous?": answer.text()},
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                // Log a message to the console
                console.log( session +" la réponse est : "+ answer.text() +" // OK" ); //Success message
                console.log(response);
                console.log(textStatus);
                console.log(jqXHR);
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error( "Erreur: "+ textStatus, errorThrown );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                console.log( " Go on!" );
            });

            // Prevent default posting of form
            event.preventDefault();
        }
    });

    // Sequence
    // ******************************************
    // var question = {
    //     'How do you bill for your services? How would you describe yourself?',
    //     'How are you able to be responsive to my needs on an ongoing basis? What is your biggest accomplishment?',
    //     'How will you proactively communicate with me on an ongoing basis? Have you read any good books lately?There are lots of different dishes on the dining table. What do you want to eat first?',
    //     'Can I call about any legal problem I have or just about matters within your specialty? What is your dream job?',
    //     'What happens if you die or retire? Who is your personal hero?'
    // };

    // Modal Exit Banner
    // ******************************************
    var lastY;
    jQuery(document).mousemove(function(e) {
        var currentY = e.pageY,
            deltaY = lastY - e.pageY;
        if( lastY != 'undefined' && e.pageY <= 5 && deltaY > 0 ) {
            // Launch MODAL BOX
            jQuery('#footer').addClass('active');
            jQuery('#wrapper').addClass('blured');
        }
        lastY = e.pageY
    });
    jQuery('#footer .icon-close, #footer').on('click',function(){
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
