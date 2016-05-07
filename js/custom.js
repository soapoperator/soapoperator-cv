/* minifyOnSave, minifier:uglify-js, filenamePattern: $1.min.$2 */

jQuery.noConflict();

//===   Redirect Old IE Browser   ===//
if ( jQuery.browser.msie ) {
    var version = jQuery.browser.version,
    url = 'ie.html';
    if (version < 10) {
        window.location.href = url;
    }
}

//== Background with Particules ==//
function particules() {
    var canvas = jQuery('#background'),
        canvasW = canvas.width(),
        canvasH = canvas.height();
    var nbH = Math.ceil(canvasH / jQuery('.particule').height()),
        nbW = Math.ceil(canvasW / jQuery('.particule').width()),
        nb = nbW * nbH;
    if (jQuery('.particule').length < nb) {
        for (var i = 0; i < nb ; i++) {
            canvas.append('<div class="particule ratio-16x35"><span class="content"></span></div>');
        }
    }
    //console.log(jQuery('.particule').length+' vs '+nb);
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
    var question;
    var sequence = function(n,q) {
            // n = id of the sequence
            // q = question sequence
            if (n <= q.length) {
                var s = jQuery('.sequence-'+ n);
                // Get the question
                question = q[n - 1];
                // Get the good question if type fake error
                var questionLabel = jQuery.isArray(question) ? question[ question.length - 1 ] : question;
                s.removeClass('hide').find('.actor__content').typeIt({
                    strings: question,
                    speed: 80,
                    lifeLike: true,
                    cursor: false,
                    breakLines: false,
                    breakDelay: 400
                }, function(){
                    // Post the answer to google sheet
                    // Check if answer is needed
                    if ( s.find('.guest__content').length ){
                        s.answer(n+1,q,questionLabel);
                    } else {
                        sequence(n+1,q);
                    }
                    // Stop the cursor animation
                    s.find('.actor__content').removeClass('no-answer');
                });
            };
        };

    // Post dial answer Function
    // ******************************************
    // Make my own custom javascript function
    jQuery.fn.extend({
        answer: function (n,q,question) {
            // n = id of the sequence
            // q = question sequence
            // question = question label
            // Get the dom
            var d = jQuery(this),
                g = d.find('.guest__content'),
                answer = g.find( ".answer-input" );
                // Show the input
                g.removeClass('hide').find('.answer-input').focus();
                // Variable to hold request
                var request;
                // Bind to the submit event of our form
                answer.keypress(function(event) {
                    if ( event.which == 13 ) {
                        //var answer = jQuery(this); // Remove because called in the function

                        // Get the data for the reponse
                        var data = {};
                        data["session"] = session;
                        data[question] = answer.text();

                        // Abort any pending request
                        if (request) {
                            request.abort();
                        }

                        // Let's disable the inputs for the duration of the Ajax request.
                        // Note: we disable elements AFTER the form data has been serialized.
                        // Disabled form elements will not be serialized.
                        answer.attr('contentEditable','false');
                        g.removeClass('no-answer');

                        sequence(n,q);

                        // Fire off the request to /form.php
                        request = jQuery.ajax({
                            url: "https://script.google.com/macros/s/AKfycbxxFsfN3Oqsvl4SLNmdVqahybsXFTobSpW8iXZfetyhGgB7z28F/exec",
                            type: "post",
                            data: data,
                        });

                        // Callback handler that will be called on success
                        request.done(function (response, textStatus, jqXHR){
                            // Log a message to the console
                            console.log( session +" // "+ question +" "+ answer.text() +" // OK" ); //Success message
                            //console.log(response);
                            //console.log(textStatus);
                            //console.log(jqXHR);
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
        }
    });

    // Sequence
    // ******************************************
    var opt = Math.floor(Math.random() * 3) + 1, // 1 -> 3
        scene = [
            "Bonjour",
            ["Comment vosu ", "Comment vous appelez-vous?"],
            "What is your dream job?",
            "How do you bill for your services? How would you describe yourself?",
            "How are you able to be responsive to my needs on an ongoing basis? What is your biggest accomplishment?",
            "How will you proactively communicate with me on an ongoing basis? Have you read any good books lately?There are lots of different dishes on the dining table. What do you want to eat first?",
            "Can I call about any legal problem I have or just about matters within your specialty? What is your dream job?",
            "What happens if you die or retire? Who is your personal hero?"
        ];
    sequence(1,scene);

    // Button tracking
    // ******************************************
    // Post button tracking Function
    var tracking = function(n) {
            // n = button id
            // Variable to hold request
            var request;

            // Get the data for the reponse
            var data = {};
            data["session"] = session;
            data[n] = 'clic';

            // Abort any pending request
            if (request) {
                request.abort();
            }

            // Fire off the request to /form.php
            request = jQuery.ajax({
                url: "https://script.google.com/macros/s/AKfycbxxFsfN3Oqsvl4SLNmdVqahybsXFTobSpW8iXZfetyhGgB7z28F/exec",
                type: "post",
                data: data,
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                // Log a message to the console
                console.log( session +" // "+ n +" // clic" ); //Success message
                //console.log(response);
                //console.log(textStatus);
                //console.log(jqXHR);
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

        }
    // Enabled function on click
    jQuery('.icon').click(function() {
        var button = jQuery(this).data("button"); //.attr("data-id") .data("id")
        console.log(button);
        tracking(button);
    });

    // Modal Exit Banner
    // ******************************************
    // open function
    var exit = function() {
            // Launch MODAL BOX
            jQuery('#footer').addClass('active');
            jQuery('#wrapper').addClass('blured');
        }
    // close function
    jQuery('#footer .icon-close, #footer').on('click',function(){
        jQuery('#footer').removeClass('active');
        jQuery('#wrapper').removeClass('blured');
    });
    //  exit function
    var lastY;
    jQuery(document).mousemove(function(e) {
        var currentY = e.pageY,
            deltaY = lastY - e.pageY;
        if( lastY != 'undefined' && e.pageY <= 5 && deltaY > 0 ) {
            exit();
        }
        lastY = e.pageY
    });
    // inactivity timer function
    var timeoutKick,
        kick_timer = 60000;  // kick user after 1 minute
    function setup() {
        this.addEventListener("mousemove", resetTimer, false);
        this.addEventListener("mousedown", resetTimer, false);
        this.addEventListener("keypress", resetTimer, false);
        this.addEventListener("DOMMouseScroll", resetTimer, false);
        this.addEventListener("mousewheel", resetTimer, false);
        this.addEventListener("touchmove", resetTimer, false);
        this.addEventListener("MSPointerMove", resetTimer, false);
        startTimer();
    }
    setup();
    function startTimer() {
        // wait 2 seconds before calling goInactive
        timeoutKick = window.setTimeout(goInactive, kick_timer);
    }
    function resetTimer(e) {
        window.clearTimeout(timeoutKick);
        goActive();
        //console.log('reset');
    }
    function goInactive() {
        exit();
        //console.log('inactive');
    }
    function goActive() {
        startTimer();
        //console.log('active');
    }

    // Particule move
    // ******************************************
    // Initialise particules
    // particules();
    // var mouseX = 0,
    //     mouseY = 0;
    // jQuery('.particule').each(function(index, el) {
    //     var particule = jQuery(el),
    //         pX = particule.offset().top,
    //         pY = particule.offset().left;
    //     particule.attr('data-x',pX).attr('data-y',pY);
    // });
    // jQuery(document).mousemove(function(e) {
    //     // mouse coodinate
    //     var mX = e.clientX,
    //         mY = e.clientY;
    //     //console.log(mouseX + ' - ' + mouseY);
    //     jQuery('.particule').each(function(index, el) {
    //         // particule coordinate
    //         var particule = jQuery(el),
    //             pX = particule.data('x'),
    //             pY = particule.data('y');
    //         //console.log('#'+index+' : '+pX+' - '+pY);
    //         var b = pX - mX,
    //             a = pY - mY,
    //             c = Math.floor(Math.sqrt( a*a + b*b)),
    //             C = Math.abs(Math.pow( c , -1 ) * 3000); // Probleme with the formula
    //         console.log('#'+index+' : '+c+' '+C);
    //         var B = Math.floor(b * C / c),
    //             A = Math.floor(a * C / c);
    //         particule.css({'top':A+'px','left':B+'px'});
    //     });
    // });

};
jQuery(document).ready(onready);

//===   On Load Functions   ===//
var onload = function () {
};
jQuery(document).load(onload);

//===   On Resize Functions   ===//
var onresize = function () {
    // Initialise particules
    //particules();
};
jQuery(window).resize(onresize);
