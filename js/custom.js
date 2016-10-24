/* minifyOnSave, minifier:uglify-js, filenamePattern: $1.min.$2 */

jQuery.noConflict();


// ******************************************
// Redirect Old IE Browser
// ******************************************
if ( jQuery.browser.msie ) {
    var version = jQuery.browser.version,
    url = 'ie.html';
    if (version < 10) {
        window.location.href = url;
    }
}


// ******************************************
// Variable
// ******************************************
var question,modalOK;


// ******************************************
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


// ******************************************
// Save a value session
// ******************************************
sessionStorage.id = date + '-' + Math.floor((Math.random() * 100) + 1);
var session = sessionStorage.id;


// ******************************************
// Sequence variable
// ******************************************
var opt = Math.floor(Math.random() * 3) + 1, // 1 -> 3
    scene1 = {
        text: [
            {
                type      :   "string",
                value     :   readCookie('name')? "Bonjour <i>" + readCookie('name') + "</i>" : "Bonjour",
            },
        ],
        answer: [
            {
                type: "next",
                path: "3",
            },
        ],
    },
    scene2 = {
        text: [
            {
                type      :   "string",
                value     :   readCookie('name')? "<i>" + readCookie('name') + "</i>, ravi de vous revoir." : "Ravi de vous revoir.",
            },
        ],
        answer: [
            {
                type: "next",
                path: "3",
            },
        ],
    },
    scene3 = {
        text: [
            {
                type      :   "string",
                value     :   "Je travaille actuellement comme <b>charger de project</b>",
            },
            {
                type      :   "setting",
                value     :   "{speed: 50}",
            },
            {
                type      :   "pause",
                value     :   "270",
            },
            {
                type      :   "delete",
                value     :   "3",
            },
            {
                type      :   "string",
                value     :   "et numérique.",
            },
            {
                type      :   "pause",
                value     :   "270",
            },
            {
                type      :   "string",
                value     :   " Voici <a id='gallery-project' href='#' class='gallery'>quelques projets</a> auxquels j'ai contribué.",
            },
        ],
        answer: [
            {
                type: "next",
                path: "4",
            },
        ],
        // answer: [
        //     type: "choose",
        //     option: [
        //     {
        //         text: "Shoot!",
        //         path: "3",
        //     }, {
        //         text: "Get in touch!",
        //         path: "4",
        //     }
        //     ]
        // ],
    },
    scene4 = {
        text: [
            {
                type      :   "pause",
                value     :   "1070",
            },
            {
                type      :   "string",
                value     :   " ",
            },
        ],
        answer: [
            {
                type: "next",
                path: readCookie('visit')? "5" : "6",
            },
        ],
    };
    scene5 = {
        text: [

            {
                type      :   "string",
                value     :   "Le site est toujours en construction.",
            },
        ],
        answer: [
            {
                type: "stop",
            },
        ],
    },
    scene6 = {
        text: [

            {
                type      :   "string",
                value     :   "C'est tout pour le moment...",
            },
            {
                type      :   "pause",
                value     :   "670",
            },
            {
                type      :   "delete",
                value     :   "3",
            },
            {
                type      :   "string",
                value     :   ", le site est en construction.",
            },
        ],
        answer: [
            {
                type: "stop",
            },
        ],
    };
readCookie('visit')? sequence(1,scene2) : sequence(1,scene1);


// ******************************************
// Dial Function
// ******************************************
function sequence(n,sc) {
    // n = id of the sequence
    // sc = question sequence

    // Wrapper
    var w = jQuery('.sequence-wrapper');

    // Add a new sequence
    var sq = w.append('<div class="sequence sequence-' + n + '"><p class="sequence__content no-answer"></p></div>');

    // TypeIt sequence
    s = jQuery('.sequence-' + n).find('.sequence__content').typeIt({
        speed: 100,
        lifeLike: true,
        cursor: false,
        breakLines: false,
        breakDelay: 400,
        callback: function(){
            sq.find('.sequence__content').removeClass('no-answer');
            answer(n,sc);
        },
    });
    for (var i = 0; i < sc.text.length; i++) {
        //console.log(sc.text[i].value);
        switch (sc.text[i].type) {
            case "string":
                s = s.tiType(sc.text[i].value);
                break;
            case "setting":
                s = s.tiSettings(sc.text[i].value);
                break;
            case "delete":
                s = s.tiDelete(sc.text[i].value);
                break;
            case "pause":
                s = s.tiPause(sc.text[i].value);
                break;
            case "break":
                s = s.tiBreak();
                break;
            default:
                break;
        };
    };
};
function answer(n,sc){
    //console.log('answer > ' + JSON.stringify(sc));
    switch (sc.answer[0].type) {
        case "stop":
            console.log('stop');
            break;
        case "next":
            console.log('next');
            var j = sc.answer[0].path,
                n = n + 1,
                sc = eval('scene'+ j); // eval convert string to variable
            sequence(n,sc);
            break;
        case "option":
            console.log('option');
            break;
        default:
            break;
    };
}


// ******************************************
// Post dial answer Function
// ******************************************
function dial(){
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
}


// ******************************************
// Button tracking
// ******************************************
function tracking(n) {
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

};
// Enabled function on click
jQuery('.button-option').each().click(function() {
    var button = jQuery(this).data("button"); //.attr("data-id") .data("id")
    console.log(button);
    tracking(button);
});


// ******************************************
// Cookies fortune
// ******************************************
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

// ******************************************
// Modal Exit Banner
// ******************************************
function modal(){
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
        };

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
        kick_timer = 120000,  // kick user after 1 minute
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
}


// ******************************************
// Exit Banner Form Animation
// ******************************************
function modalFormAnimation(){
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
}


// ******************************************
// Pushbullet trick
// ******************************************
function modalFormPushbullet(){
    jQuery('#modal-form').on('submit',function(event){
        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // Enable Loading
        jQuery('.spinner').addClass('loading');

        // Clear result div
        jQuery("#result").html('');

        // Get from elements values
        var values = jQuery(this).serialize() + '&type=note';

        // Request
        jQuery.ajax({
            url: "./api/pushbullet/pushbullet.php",
            type: "post",
            data: values ,
            dataType : 'json', // We want json
            success: function (response) {
                // you will get response from your php page (what you echo or print)
                //console.log( JSON.stringify(response) );
                // Add cookie
                createCookie('name',response.custom.name,'30');
                // Remove Loading
                setTimeout(
                    function(){
                        jQuery('.spinner').removeClass('loading');
                        jQuery('#modal-form').fadeOut('500', function() {
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
}


// ******************************************
// I Miss You Favicon
// ******************************************
function missYou(){
    jQuery.iMissYou({
        title: "Avant de partir...",
        favicon: {
            enabled: true,
            src:'images/iMissYouFavicon.ico'
        }
    });
}


// ******************************************
// Photoswipe
// ******************************************
var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [
    {
        src: './images/portfolio/tomiotee-site.jpg',
        w: 600,
        h: 400,
        msrc: './images/portfolio/thumbnail/tomiotee-site.jpg', // small image placeholder,
        title: 'Image Caption',  // used by Default PhotoSwipe UI
        author: 'jbo',
    },
    {
        src: './images/portfolio/tomiotee-salon.jpg',
        msrc: './images/portfolio/thumbnail/tomiotee-salon.jpg', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/restov-site.jpg',
        msrc: './images/portfolio/thumbnail/restov-site.jpg', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/ellop-logo.png',
        msrc: './images/portfolio/thumbnail/ellop-logo.png', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/netdevices-site.png',
        msrc: './images/portfolio/thumbnail/netdevices-site.png', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/itmize-site2.png',
        msrc: './images/portfolio/thumbnail/itmize-site2.png', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/xl-site.jpg',
        msrc: './images/portfolio/thumbnail/xl-site.jpg', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/mariage-site.jpg',
        msrc: './images/portfolio/thumbnail/mariage-site.jpg', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/mds-slogan.png',
        msrc: './images/portfolio/thumbnail/mds-slogan.png', // small image placeholder,
        w: 1200,
        h: 900
    },
    {
        src: './images/portfolio/easylife-carte-recto.jpg',
        msrc: './images/portfolio/thumbnail/easylife-carte-recto.jpg', // small image placeholder,
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
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: true,
    preloaderEl: true,
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

var openPhotoSwipe = function() {



    // Gallery starts closing
    gallery.listen('close', function() { });
};
// Open Gallery
jQuery('#dial').on('click','.gallery',function(event){
    event.preventDefault();
    console.log('gallery');
    gallery.init();
});

//===   On Ready Functions   ===//
var onready = function () {
    modal();
    modalFormAnimation();
    modalFormPushbullet();
    missYou();
    createCookie('visit','1','30')
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
