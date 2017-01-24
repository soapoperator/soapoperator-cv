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
                value     :   readCookie('name')? "Bonjour <i>" + readCookie('name') + "</i>," : "Bonjour,",
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
                value     :   " Voici <a id='gallery-project-current' href='#' class='gallery'>quelques projets</a> auxquels j'ai contribué. <a id='gallery-project-old' href='#' class='gallery'>Ou les vieux</a> .",
            },
            {
                type      :   "pause",
                value     :   "2570",
            },
            {
                type      :   "break",
                value     :   " ",
            },
            {
                type      :   "break",
                value     :   " ",
            },
            {
                type      :   "string",
                value     :   "C'est tout pour le moment...",
            },
            {
                type      :   "pause",
                value     :   "1070",
            },
            {
                type      :   "delete",
                value     :   "3",
            },
            {
                type      :   "string",
                value     :   ", le site est en construction. ☭",
            },
        ],
        // answer: [
        //     {
        //         type: "stop",
        //     },
        // ],
        answer: [
            {
                type: "choose",
                name: "test",
                option: [
                {
                    text: readCookie('test') === "ok" ? "Chout!" : "Shoot!",
                    path: "3",
                    value: "ok",
                },
                {
                    text: "Get in touch! Get in touch!",
                    path: "4",
                    value: "ko",
                }
                ]
            }
        ],
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
                value     :   "→ → Le site est toujours en construction. ☭",
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
                value     :   ", le site est en construction. ☭",
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
        speed: 70,
        lifeLike: true,
        cursor: false,
        breakLines: false,
        breakDelay: 400,
        callback: function(){
            sq.find('.sequence__content').removeClass('no-answer');
            answer(n,sc);
            return false;
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

    // Keep to bottom
    updateScroll('body',1000,(sc.text.length + 3));
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
        case "choose":
            console.log('option');
            // Add button
            var btn = '',
                m = n + 1,
                cn = sc.answer[0].name, // For cookie
                opt = sc.answer[0].option;
            for (var i = 0; i < opt.length; i++){
                var j = opt[i].path,
                    w = 12 / opt.length,
                    cv = opt[i].value, // For cookie
                    sc = 'scene'+ j; // need string
                btn = btn + '<button class="choose__option choose__option-'+ (i+1) +' col-'+ (w-1) +' animated zoomIn fadeIn" data-path="'+ sc +'" data-nth="'+ m +'" data-cn="'+ cn +'" data-cv="'+ cv +'"><span>'+ opt[i].text +'</span></button>'
            }
            // Add a new choose
            var aw = jQuery('.sequence-wrapper').append('<div class="choose choose-' + n + '"><p class="choose__content no-answer grid-row-noGutter-equalHeight-center-middle">'+ btn +'</p></div>');
            // Keep to bottom
            updateScroll('body',1000,1);
            break;
        default:
            break;
    };
};
// Answer click Function
jQuery('#dial').on('click','.choose__option:not(.stop)',function(event){
    event.preventDefault();
    var sc = eval(jQuery(this).data('path')),
        n = eval(jQuery(this).data('nth')),
        cn = jQuery(this).data('cn'),
        cv = jQuery(this).data('cv');
    jQuery(this).addClass('ok stop')
        .siblings('.choose__option').addClass('ko stop')
        .parents('.choose__content').removeClass('no-answer');
    //console.log(readCookie(cn));
    eraseCookie(cn);
    createCookie(cn,cv,'30');
    sequence(n,sc);
});
// Keep overflow div scrolled to bottom
function toBottom(id){
    var e = jQuery('#'+id),
        eH = e.prop('scrollHeight');
    e.animate({ scrollTop: eH }, '200');
    //console.log(JSON.stringify(e, null, 4));
    //console.log(eH);
};
function updateScroll(id,delay,repetitions){
    var x = 0,
        intervalID = window.setInterval(function () {
           toBottom(id);
           //console.log(delay+ ' = ' +repetitions+'-'+x);
           if (++x === repetitions) {
               window.clearInterval(intervalID);
           }
        }, delay);
    //console.log(jQuery('#dial')[0].scrollHeight +' = '+element.prop('scrollHeight'));
    //console.log(element.prop('scrollHeight')+' = '+element.scrollHeight);
};


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
        _paq.push(['trackEvent', 'Question', 'Valid', question]);
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
            modalTarget:        'exitModal',
            animatedIn:         'slideInDown', //bounceIn
            animatedOut:        'slideOutUp', //bounceOut
            color:              '#76ebff',
            animationDuration:  '0.6s',
            beforeOpen: function() {
                //jQuery('#wrapper').addClass('blured');

                // Children animation
                var children = jQuery('.modal-content > *');
                var index = 0;

                function addClassNextChild() {
                    if (index == children.length) return;
                    children.eq(index++).addClass('animated fadeInUp');
                    window.setTimeout(addClassNextChild, 50);
                }

                addClassNextChild();
            },
            afterOpen: function() {
            },
            afterClose: function() {
                //jQuery('#wrapper').removeClass('blured');
                jQuery('.modal-content > *').removeClass('animated fadeInUp')
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

    // launch modal on exit
    // https://github.com/drei01/jquery-exit-popup
    var last_position = {};
    jQuery(document).on('mousemove', function (event) {
        if (typeof(last_position.x) != 'undefined') {
            var deltaX = last_position.x - event.offsetX,
                deltaY = last_position.y - event.offsetY;
            if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                //upward movement
    			if(event.pageY <= 5){
    				exit();
    			}
            }
            //console.log(deltaX+' x '+deltaY);
        }
        last_position = {
            x : event.offsetX,
            y : event.offsetY
        };
    });
    // launch exit modal if windows loose focus
    jQuery(window).focus(function() {
        // focus
    }).blur(function() {
        //exit();
    });
};


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
        jQuery('.modal-content .spinner').addClass('loading');

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
                // You will get response from your php page (what you echo or print)
                //console.log( JSON.stringify(response) );
                // Add cookie
                createCookie('name',response.custom.name,'30');
                // Remove Loading
                setTimeout(
                    function(){
                        jQuery('.modal-content .spinner').removeClass('loading');
                        jQuery('#modal-form').fadeOut('500', function() {
                            jQuery('#modal-result')
                                .addClass('on')
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
var galleryCurrentOpen = document.getElementById('open-gallery-current-btn'), //open-gallery-btn
    galleryOldOpen = document.getElementById('open-gallery-old-btn'), //open-gallery-btn
    openCurrentGallery = function() {

        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var itemsCurrent = [
            {
                src: './images/portfolio/optimized/dico-du-lait.fr.png',
                w: 1545,
                h: 853,
                title: '<b>2016</b><br><a href="http://dico-du-lait.fr/" rel="nofollow">Site à destination des professionnels de la filière laitière.</a><br/>Réalisé en interne de A à Z sur Wordpress.',
            },
            {
                src: './images/portfolio/optimized/www.cerin.org.png',
                w: 1545,
                h: 853,
                title: '<b>2016</b><br><a href="http://www.cerin.org/" rel="nofollow">Site à destination des professionnels de santé et de santé publique.</a><br/>Gestion de projet. Site réalisé par <a href="http://www.cosavostra.com/" rel="nofollow" class="alt">CosaVostra</a> sur Wordpress.',
            },
            {
                src: './images/portfolio/optimized/qrpl.fr.png',
                w: 1545,
                h: 853,
                title: '<b>2016</b><br><a href="http://qrpl.fr/" rel="nofollow">Site prébicité par les professionnels de la filière laitière.</a><br/>Projet réalisé de A à Z en interne sur Dokuwiki, choisi pour la rapidité de mise en place. Les besoins évoluent rapidement et la plateforme ne semble plus adaptée... Affaire à suivre.',
            },
            {
                src: './images/portfolio/optimized/les-mammites-j-anticipe.fr.jpg',
                w: 1545,
                h: 853,
                title: '<b>2015</b><br><a href="http://les-mammites-j-anticipe.fr" rel="nofollow">Site à destination des professionnels de la filière.</a><br/>Gestion de projet pour commencer, nous avons internalisé la maintenance et la réalisation des évolutions.',
            },
            {
                src: './images/portfolio/optimized/www.produits-laitiers.com.png',
                w: 1545,
                h: 853,
                title: '<b>2015</b><br><a href="http://www.produits-laitiers.com" rel="nofollow">Site d\'information complète à déstination du grand public.</a><br/>Gestion de projet. Site réalisé par <a href="https://beapi.fr/" rel="nofollow" class="alt">Beapi</a> sur Wordpress. Mise-en-place de stratégie inbound par <a href="https://www.mychefcom.com/" rel="nofollow" class="alt">mychefcom.com</a> et suivi SEO par <a href="https://www.powertrafic.fr/" rel="nofollow" class="alt">Powertrafic</a>.',
            },
            {
                html: '<div class="pswp__html grid-column-center"><p class="col-6_xs-10" data-push-left="off-3_xs-1">VOUS SOUHAITEZ ME CONTACTER ?<br/><a class="icon" href="mailto:jbo@soapoperator.com" itemprop="email" data-button="Bouton email" onclick="javascript:_paq.push([\'trackEvent\', \'Gallery - Current\', \'Clic\', \'Email\']);">Envoyez-moi un email</a></p><div class="clear"></div></div>'
            },
        ];

        // define options (if needed)
        var options = {
            index: 0, // start at first slide
            showHideOpacity: true,
            bgOpacity: 1,
            maxSpreadZoom: 3,
            loop: true,
            closeOnScroll: false,
            mouseUsed: true,
            preload: [1,3],
            mainClass: '',
            errorMsg : '<div class="pswp__error-msg"><a href="%url%" target="_blank">L\'image</a> n\'a pas pu être chargée.</div>',
        };

        // Initializes and opens PhotoSwipe
        var galleryCurrent = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, itemsCurrent, options);

        galleryCurrent.init();

        // After gallery is closed and closing animation finished.
        galleryCurrent.listen('destroy', function() {
            console.log('Gallery is closed!');
            jQuery('#dialogue').addClass('escapeIn').removeClass('escapeOut');
            jQuery('#id').addClass('escapeIn').removeClass('escapeOut');
        });
    },
    openOldGallery = function() {

        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var itemsOld = [
            {
                src: './images/portfolio/optimized/www.franckbarros.com.png',
                w: 1499,
                h: 903,
                title: '<b>2014</b><br>Site contruit de A à Z pour le chanteur et musicien <a href="http://www.franckbarros.com" rel="nofollow">Franck Barros</a>',
            },
            {
                src: './images/portfolio/optimized/resopharma.site.png',
                w: 3200,
                h: 2300,
                title: '<b>2013</b><br>Template d\'étude.',
            },
            {
                src: './images/portfolio/optimized/tomiotee.com.v2.1.png',
                w: 1632,
                h: 1035,
                title: '<b>2011 - 2012</b><br>Pour le lancement d\'une marque de prêt-à-porter, conception et développement d\'une boutique. Sur Magento dans un premier temps. Ici la V2 sur Wordpress, jamais mise en ligne. <a href="#&gid=1&pid=13" rel="nofollow">Envie de savoir pourquoi?</a>',
            },
            {
                src: './images/portfolio/optimized/tomiotee.salon.jpg',
                w: 900,
                h: 720,
                title: '<b>2011 - 2012</b><br>En complément du site, accompagnement et réalisation des identités visuelles pour la marque.',
            },
            {
                src: './images/portfolio/optimized/helios.site.png',
                w: 1020,
                h: 1020,
                title: '<b>2011 - 2012</b><br>Démarrage d\'une stratup : conception d\'un manuel pédagogique personnalisable et interactif sur iPad, à destination des enseignants. Création d\'un prototype. Accompagnement du développement chez un prestataire.',
            },
            {
                src: './images/portfolio/optimized/ellop.logo.png',
                w: 550,
                h: 247,
                title: '<b>2011</b><br>Refonte des sites internet sous Wordpress du groupe.<br> Création et intégration de la charte graphique.',
            },
            {
                src: './images/portfolio/optimized/restov.site.jpg',
                w: 1220,
                h: 1020,
                title: '<b>2011</b><br>Projet de site.',
            },
            {
                src: './images/portfolio/optimized/itmize.site.png',
                w: 3400,
                h: 3400,
                title: '<b>2011</b><br>Etude pour un réseau social professionnel',
            },
            {
                src: './images/portfolio/optimized/mariage.site.png',
                w: 1020,
                h: 1020,
                title: '<b>2011</b><br>Design pour une opération marketing.',
            },
            {
                src: './images/portfolio/optimized/www.xl.com.jpg',
                w: 1299,
                h: 903,
                title: '<b>2010 - 2011</b><br>Refonte de plusieurs sites B2B et B2C : définition de fonctionnalités et suivi des prestataires.<br>Mise en place d\'une stratégie d\'emailing relationnel.',
            },
            {
                src: './images/portfolio/optimized/easylife.carte-recto.jpg',
                w: 680,
                h: 959,
                title: '<b>2010</b><br>Réalisation de visuels pour une innovation présentée au concours Lépine.',
            },
            {
                src: './images/portfolio/optimized/mds.slogan.png',
                w: 7016,
                h: 4961,
                title: '<b>2009</b><br>Réalisation de diverses visuels, d\'un site, etc.',
            },
            {
                html: '<div class="pswp__html grid-column-center"><p class="col-6_xs-10" data-push-left="off-3_xs-1">VOUS SOUHAITEZ ME CONTACTER?<br/><a class="icon" href="mailto:jbo@soapoperator.com" itemprop="email" data-button="Bouton email" onclick="javascript:_paq.push([\'trackEvent\', \'Gallery - Current\', \'Clic\', \'Email\']);">Envoyez-moi un email</a></p><div class="clear"></div></div>'
            },
        ];

        // define options (if needed)
        var options = {
            index: 0, // start at first slide
            showHideOpacity: true,
            bgOpacity: 1,
            maxSpreadZoom: 3,
            loop: true,
            closeOnScroll: false,
            mouseUsed: true,
            preload: [1,3],
            mainClass: '',
            errorMsg : '<div class="pswp__error-msg"><a href="%url%" target="_blank">L\'image</a> n\'a pas pu être chargée.</div>',
        };

        // Initializes and opens PhotoSwipe
        var galleryOld = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, itemsOld, options);

        galleryOld.init();

        // After gallery is closed and closing animation finished.

        galleryOld.listen('destroy', function() {
            console.log('Gallery is closed!');
            jQuery('#dialogue').addClass('escapeIn').removeClass('escapeOut');
            jQuery('#id').addClass('escapeIn').removeClass('escapeOut');
        });
    };

// Button to open the gallery
galleryCurrentOpen.onclick = openCurrentGallery;
galleryOldOpen.onclick = openOldGallery;

// Open Gallery Function
jQuery('#dial').on('click','#gallery-project-current',function(event){
    event.preventDefault();
    jQuery('#dialogue').removeClass('escapeIn').addClass('animated escapeOut');
    jQuery('#id').removeClass('escapeIn').addClass('animated escapeOut');
    setTimeout(function () {
        jQuery('#open-gallery-current-btn').trigger( 'click' );
    }, 400);
});
jQuery('#dial').on('click','#gallery-project-old',function(event){
    event.preventDefault();
    jQuery('#dialogue').removeClass('escapeIn').addClass('animated escapeOut');
    jQuery('#id').removeClass('escapeIn').addClass('animated escapeOut');
    setTimeout(function () {
        jQuery('#open-gallery-old-btn').trigger( 'click' );
    }, 400);
});


//===   On Ready Functions   ===//
var onready = function () {
    modal();
    modalFormAnimation();
    modalFormPushbullet();
    missYou();
    createCookie('visit','1','30');
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
