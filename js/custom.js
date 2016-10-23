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
                    jQuery('.gallery').on('click', function(event) {
                        console.log('gallery');
                        gallery.init();
                        event.preventDefault();
                    });
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
                            _paq.push(['trackEvent', 'Question', 'Valid', question]);
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

    // Cookies fortune
    // ******************************************


    // Sequence
    // ******************************************
    var opt = Math.floor(Math.random() * 3) + 1, // 1 -> 3
        scene = [
            "Bonjour",
            ["Comment vosu ", "Comment vous <a href='#' class='gallery'>appelez-vous?</a>"],
            "What is your dream job?",
            "How do you bill for your services? How would you describe yourself?",
            "How are you able to be responsive to my needs on an ongoing basis? What is your biggest accomplishment?",
            "How will you proactively communicate with me on an ongoing basis? Have you read any good books lately?There are lots of different dishes on the dining table. What do you want to eat first?",
            "Can I call about any legal problem I have or just about matters within your specialty? What is your dream job?",
            "What happens if you die or retire? Who is your personal hero?"
        ];

        // define("conversation", [], function() {
        //                var e = function(e) {
        //                    return {
        //                        greeting: e.hasSeenChat ? [e.welcomeBackGreeting, "Still want to know more or just get in touch now?", {
        //                            type: "choose",
        //                            answers: [{
        //                                text: "Shoot!",
        //                                path: "tellmemore-second"
        //                            }, {
        //                                text: "Get in touch!",
        //                                path: "contact"
        //                            }]
        //                        }] : ["Hi there!", "I'm Adrian, a UX designer living in Zurich, Switzerland.", "Want to know more or do you want to get in touch?", {
        //                            type: "choose",
        //                            answers: [{
        //                                text: "Tell me more!",
        //                                path: "tellmemore"
        //                            }, {
        //                                text: "Get in touch!",
        //                                path: "contact"
        //                            }]
        //                        }],
        // tellmemore: [e.hasSeenChat ? 'Alright! I\'m going to be honest with you. I learned this whole "introducing myself" stuff by heart, so I might repeat myself from time to time.' : "I feel humbled. 🙂", e.hasSeenChat ? "As mentioned, I write and speak about design and feel fortunate to have worked with incredibly talented people across different companies." : "I write and speak about design and am fortunate to have worked with incredibly talented people across different companies.", {
        //                     type: "choose",
        //                     answers: [{
        //                         text: "Which companies?",
        //                         path: "companies"
        //                     }, {
        //                         text: "You write?!",
        //                         path: "write"
        //                     }]
        //                 }],
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
    jQuery('.icon:not(#contact-form-button)').click(function() {
        var button = jQuery(this).data("button"); //.attr("data-id") .data("id")
        console.log(button);
        tracking(button);
    });

    // Modal Exit Banner
    // ******************************************
    // open function
    var exitModal = jQuery("#toggle-exitModal").animatedModal({
            modalTarget:'exitModal',
            animatedIn:'', //bounceIn
            animatedOut:'bounceOut',
            color:'#F9E45B',
            beforeOpen: function() {
                jQuery('#wrapper').addClass('blured');
            },
            afterClose: function() {
                jQuery('#wrapper').removeClass('blured');
            }
        }),
        exit = function() {
            exitModal.open();
        }
    // click for exit
    jQuery('.modal-wrapper').on('click', function(event) {
        exitModal.close();
        event.preventDefault();
    });
    jQuery('.modal').on('click', function(event) {
        event.stopPropagation();
    });
    // exit banner
    var lastY;
    jQuery(document).mousemove(function(e) {
        var currentY = e.pageY,
            deltaY = lastY - currentY;
        if( lastY != 'undefined' && currentY <= 5 && deltaY > 0 ) {
            exit();
        }
        lastY = e.pageY;
    });
    // timer function
    var timeoutKick,
        kick_timer = 60000,  // kick user after 1 minute
        startTimer = function() {
            // wait before calling goInactive
            timeoutKick = window.setTimeout(goInactive, kick_timer);
        },
        resetTimer = function(e) {
            window.clearTimeout(timeoutKick);
            goActive();
            //console.log('reset');
        },
        pauseTimer = function(e) {
            window.clearTimeout(timeoutKick);
            console.log('pause');
        },
        goInactive = function() {
            exit();
            //console.log('inactive');
        },
        goActive = function() {
            startTimer();
            //console.log('active');
        },
        setup = function() {
            this.addEventListener("mousemove", resetTimer, false);
            this.addEventListener("mousedown", resetTimer, false);
            this.addEventListener("keypress", resetTimer, false);
            this.addEventListener("DOMMouseScroll", resetTimer, false);
            this.addEventListener("mousewheel", resetTimer, false);
            this.addEventListener("touchmove", resetTimer, false);
            this.addEventListener("MSPointerMove", resetTimer, false);
            startTimer();
        };
    setup();

    // Exit Banner Form
    // ******************************************
    var ia = jQuery('#contact-form-name').val(),
        ib = jQuery('#contact-form-contact').val(),
        contactFormReady = function(a,b) {
            if ( a === '' && b === '' ) {
                jQuery('#contact-form-button').removeClass('ready');
                jQuery('#contact-form-button').removeClass('half');
            } else if ( a === '' || b === '' ) {
                jQuery('#contact-form-button').removeClass('ready');
                jQuery('#contact-form-button').addClass('half');
            } else {
                jQuery('#contact-form-button').addClass('ready');
                jQuery('#contact-form-button').removeClass('half');
            }
            //console.log(a +' + '+ b);
    };

    // Position initiale
    contactFormReady(ia,ib);

    // Position retro-active
    jQuery('#contact-form-name, #contact-form-contact').on('change keyup paste',function() {
        var ia = jQuery('#contact-form-name').val(),
            ib = jQuery('#contact-form-contact').val();
        contactFormReady(ia,ib);
    });

    // Pushbullet trick
    // ******************************************
    jQuery('#modal-form').on('submit',function(event){
        /* Prevent default posting of form - put here to work in case of errors */
        event.preventDefault();
        /* Enable Loading */
        jQuery('.spinner').addClass('loading');
        /* Clear result div */
        jQuery("#result").html('');
        /* Get from elements values */
        var values = jQuery(this).serialize() + '&type=note';
        /* Request */
        jQuery.ajax({
            url: "./api/pushbullet/pushbullet.php",
            type: "post",
            data: values ,
            dataType : 'json', // We want json
            success: function (response) {
                // you will get response from your php page (what you echo or print)
                console.log( JSON.stringify(response) );
                // Remove Loading
                setTimeout(
                    function(){
                        jQuery('.spinner').removeClass('loading');
                        jQuery('#modal-form').fadeOut('500', function() {
                            //jQuery('#modal-result').html('<span>' + response.custom.name + ', à bientôt.</span>');
                            jQuery('#modal-result')
                                .typeIt({
                                    speed: 80,
                                    lifeLike: true,
                                    cursor: false,
                                    breakLines: false,
                                    breakDelay: 400,
                                })
                                .tiType('<span>' + response.custom.name + ', à bientôt!!</span>');
                        });
                    },500);
            },
            error: function(xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    });

    // I Miss You Favicon
    // ******************************************
    jQuery.iMissYou({
        title: "Avant de partir...",
        favicon: {
            enabled: true,
            src:'images/iMissYouFavicon.ico'
        }
    });

    // Photoswipe
    // ******************************************
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: './images/portfolio/tomiotee-site.jpg',
            w: 600,
            h: 400
        },
        {
            src: './images/portfolio/tomiotee-wishing-card.png',
            w: 1200,
            h: 900
        }
    ];

    // define options (if needed)
    var options = {
        index: 0, // start at first slide
        loop: true,
        closeOnScroll: false,
        mouseUsed: true,
        preload: [1,3],
    };

    var optionsUI = {
        closeEl:true,
        captionEl: true,
        fullscreenEl: true,
        zoomEl: true,
        shareEl: false,
        counterEl: false,
        arrowEl: true,
        preloaderEl: true,
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

    //gallery.init();

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
