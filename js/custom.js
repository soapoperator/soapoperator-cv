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
        scene: "scene1",
        text: [
            {
                type      :   "string",
                value     :   readCookie('name') ? "Bonjour <i>" + readCookie('name') + "</i>" : "Bonjour",
            },
        ],
        answer: [
            {
                type: "next",
                path: readCookie('project_manager') ? "4" : "3",
            },
        ],
    },
    scene2 = {
        scene: "scene2",
        text: [
            {
                type      :   "string",
                value     :   readCookie('name') ? "Ravi de vous revoir, <i>" + readCookie('name') + "</i>" : "Welcome back !",
            },
            {
                type      :   "pause",
                value     :   "300",
            },
        ],
        answer: [
            {
                type: "next",
                path: readCookie('project_manager') ? "4" : "3",
            },
        ],
    },
    // Séquence : Charger de projets
    scene3 = {
        scene: "scene3",
        text: [
            {
                type      :   "string",
                value     :   readCookie('visit') ? "Je suis toujours en poste et charger de projet." : "Je m'appelle <u>Jean-baptiste</u> et je travaille actuellement comme <b>charger de projects</b> digit",
            },
            {
                type      :   "pause",
                value     :   "270",
            },
            {
                type      :   "setting",
                value     :   "{speed: 50}",
            },
            {
                type      :   "delete",
                value     :   "5",
            },
            {
                type      :   "setting",
                value     :   "{speed: 150}",
            },
            {
                type      :   "string",
                value     :   "numérique.",
            },
            {
                type      :   "pause",
                value     :   readCookie('project_manager') ? "0" : "300",
            },
        ],
        answer: [
            {
                type: "choose",
                name: "project_manager",
                option: [
                {
                    text: "Charger de projets?",
                    path: "100",
                    value: "question",
                },
                {
                    text: "Numérique ou digital?",
                    path: "101",
                    value: "follow",
                }
                ]
            }
        ],
    },
    scene100 = {
        scene: "scene100",
        text: [
            {
                type      :   "string",
                value     :   readCookie('digital_numerique') ? "En dehors des débats jargoneux, être à la fois, <span class='link-fake' data-balloon='Aider à l&apos;ensemble de l&apos;équipe et des intervenants à exprimer leur potentiel et leurs idées' data-balloon-pos='up' data-balloon-length='large'>facilitateur</span>, <span class='link-fake' data-balloon='Les délais, les objectifs, etc.' data-balloon-pos='up' data-balloon-length='large'>garant</span>, <span class='link-fake' data-balloon='Un plus ou moins gros plus!' data-balloon-pos='up' data-balloon-length='large'>inspirateur</span>... En trois mot, s'assurer que le projet se déroule bien." : "<span class='link-fake' data-balloon='Aider à l&apos;ensemble de l&apos;équipe et des intervenants à exprimer leur potentiel et leurs idées' data-balloon-pos='up' data-balloon-length='large'>Facilitateur</span>, <span class='link-fake' data-balloon='Les délais, les objectifs, etc.' data-balloon-pos='up' data-balloon-length='large'>garant</span>, <span class='link-fake' data-balloon='Un plus ou moins gros plus!' data-balloon-pos='up' data-balloon-length='large'>inspirateur</span>... En trois mot, s'assurer que le projet se déroule bien.",
            },
            {
                type      :   "break",
                value     :   " ",
            },
            {
                type      :   "string",
                value     :   readCookie('digital_numerique') ? "pause" : "break",
            },
        ],
        answer: [
            {
                type: "choose",
                name: "project_manager_how",
                option: [
                {
                    text: "Quels sont vos projets actuels?",
                    path: "110",
                    value: "project",
                },
                {
                    text: "Comment vous contacter?",
                    path: readCookie('visit') ? "191" : "190",
                    value: "contact",
                }
                ]
            }
        ],
    },
    scene101 = {
        scene: "scene101",
        text: [
            {
                type      :   "string",
                value     :   "J'ai tendance à penser <u>numérique</u> même si ma langue fourche parfois... Cependant je sais me servir de mes 10 doigts.",
            },
            {
                type      :   "break",
                value     :   " ",
            },
            {
                type      :   "string",
                value     :   readCookie('visit') ? "" : "<a href='https://www.digitalforallnow.com/digital-numerique/' target='_blank' rel='nofollow'>Mini débat !?</a> &#9787;",
            },
        ],
        answer: [
            {
                type: "choose",
                name: "digital_numerique",
                option: [
                {
                    text: "Pour revenir à votre travail de charger de projet",
                    path: "100",
                    value: "project_manager",
                },
                {
                    text: "Quels sont vos projets actuels?",
                    path: "110",
                    value: "project",
                }
                ]
            }
        ],
    },
    scene110 = {
        scene: "scene110",
        text: [
            {
                type      :   "string",
                value     :   readCookie('again_projet') === 'no' ? "<a id='gallery-project-current' href='#' class='gallery' data-link='quelques projets'>Pas de nouveaux projets</a> depuis votre précédente visite." : "Voici <a id='gallery-project-current' href='#' class='gallery' data-link='quelques projets'>quelques projets récents</a> auxquels je contribue ces temps-ci.",
            },
            // {
            //     type      :   "string",
            //     value     :   " <a id='gallery-project-old' href='#' class='gallery' data-link='Ou les vieux'>Ou les vieux</a>. <a id='gallery-project-crazy' href='#' class='gallery' data-link='Ou les vieux'>Ou les vieux</a>.",
            // },
        ],
        answer: [
            {
                type: "choose",
                name: "project_new",
                option: [
                {
                    text: "Et précédemment?",
                    path: "100",
                    value: "old",
                },
                {
                    text: "Comment vous contacter?",
                    path: "190",
                    value: "contact",
                }
                ]
            }
        ],
    },
    scene4 = {
        scene: "scene4",
        text: [
            {
                type      :   "string",
                value     :   "Le site est encore en construction... ",
            },
            {
                type      :   "pause",
                value     :   "270",
            },
            {
                type      :   "setting",
                value     :   "{speed: 80}",
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
                value     :   readCookie('name') ? "<i>" + readCookie('name') + "</i>, il me semble que je vous avais déjà présenté mes projets récents." : "Il me semble que je vous avais déjà présenté mes projets récents.",
            },
            {
                type      :   "break",
                value     :   " ",
            },
            {
                type      :   "setting",
                value     :   "{speed: 200}",
            },
            {
                type      :   "string",
                value     :   "Souhaitez-vous les revoir?",
            },
        ],
        answer: [
            {
                type: "choose",
                name: "again_projet",
                option: [
                {
                    text: "Oui",
                    path: "100",
                    value: "yes",
                },
                {
                    text: "Non",
                    path: "191",
                    value: "no",
                }
                ]
            }
        ],
    },
    scene190 = {
        scene: "scene190",
        text: [
            {
                type      :   "string",
                value     :   "Le site est toujours en construction ☭☭ Mais je reste joignable pendant les travaux :",
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
                value     :   "<a href='mailto:jbo@soapoperator.com?subject=Après la visite de votre CV'>par email</a>",
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
                value     :   "<a href='https://twitter.com/soapoperator/'>sur face</a>",
            },
            {
                type      :   "delete",
                value     :   "8",
            },
            {
                type      :   "setting",
                value     :   "{speed: 50}",
            },
            {
                type      :   "string",
                value     :   "<a href='https://twitter.com/soapoperator/'> sur twitter</a>",
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
                type      :   "setting",
                value     :   "{speed: 350}",
            },
            {
                type      :   "string",
                value     :   "<a href='https://t.me/j_b_o'>par telegram</a>",
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
                value     :   "A bientôt.",
            },
        ],
        answer: [
            {
                type: "stop",
            },
        ],
    },
    scene191 = {
        scene: "scene191",
        text: [
            {
                type      :   "string",
                value     :   readCookie('again_projet') === 'no' ? "Si vous souhaitez me contacter, suivez les liens ci-dessous: " : "Pour me contacter : ",
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
                value     :   "<a href='mailto:jbo@soapoperator.com?subject=Après la visite de votre CV'>par email</a>",
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
                value     :   "<a href='https://twitter.com/soapoperator/'>sur face</a>",
            },
            {
                type      :   "delete",
                value     :   "8",
            },
            {
                type      :   "setting",
                value     :   "{speed: 50}",
            },
            {
                type      :   "string",
                value     :   "<a href='https://twitter.com/soapoperator/'> sur twitter</a>",
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
                type      :   "setting",
                value     :   "{speed: 350}",
            },
            {
                type      :   "string",
                value     :   "<a href='https://t.me/j_b_o'>par telegram</a>",
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
                value     :   "A bientôt.",
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
    //console.log('answer > ' + JSON.stringify(sc));

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

            var scene = 'Stop - '+sc.scene;

            // Piwik event
            _paq.push(['trackEvent','Dial','Stop',scene]);

            break;
        case "next":
            console.log('next');

            var j = sc.answer[0].path,
                scene = 'Next - '+sc.scene,
                n = n + 1,
                sc = eval('scene'+ j); // eval convert string to variable

            // Piwik event
            _paq.push(['trackEvent','Dial','Next',scene,j]);

            sequence(n,sc);
            break;
        case "choose":
            console.log('choose');

            // Add button
            var btn = '',
                scene = sc.scene,
                n = n + 1,
                cn = sc.answer[0].name, // For cookie
                opt = sc.answer[0].option;
            for (var i = 0; i < opt.length; i++){
                var j = opt[i].path,
                    w = 12 / opt.length,
                    cv = opt[i].value, // For cookie
                    sc = 'scene'+ j; // need string
                btn = btn + '<button class="choose__option choose__option-'+ (i+1) +' col-'+ (w) +' animated zoomIn fadeIn" data-scene="'+ scene +'" data-path="'+ j +'" data-nth="'+ n +'" data-cn="'+ cn +'" data-cv="'+ cv +'"><span>'+ opt[i].text +'</span></button>'
            }

            // Piwik event
            _paq.push(['trackEvent','Dial','Choose',scene,j]);

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

    var j = eval(jQuery(this).data('path')),
        sc = eval('scene'+ j),
        n = eval(jQuery(this).data('nth')),
        scene = jQuery(this).data('scene'),
        cn = jQuery(this).data('cn'),
        cv = jQuery(this).data('cv');

    jQuery(this).addClass('ok stop')
        .siblings('.choose__option').addClass('ko stop')
        .parents('.choose__content').removeClass('no-answer');

    // Piwik event
    _paq.push(['trackEvent','Dial','Choose - Clic',scene+' - '+cn,cv]);

    // Cookie
    //console.log(readCookie(cn));
    eraseCookie(scene);
    createCookie(cn,cv,'30');

    console.log(cn);
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
// Piwik tracking
// ******************************************
function piwikEvent(n) {
    jQuery('.ti-container').on('click touchstart', 'a.gallery', function(event) {
        var id = jQuery(this).attr('id'),
            idclean = id.replace('gallery-',''),
            type = idclean.charAt(0).toUpperCase() + idclean.slice(1);
        _paq.push(['trackEvent', 'Dial', 'Clic', type]);
    });
    jQuery('#about-social').on('click touchstart', 'a', function(event) {
        var type = jQuery(this).data('button');
        _paq.push(['trackEvent', 'Social', 'Clic', type]);
    });
    jQuery('#exitModal').on('click touchstart', 'a.download', function(event) {
        var type = jQuery(this).data('button');
        _paq.push(['trackEvent', 'Modal', 'Clic', 'CV - Download']);
    });
}

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
// animatedModal is a fork
function modal(){
    var exitModal = jQuery("#toggle-exitModal").animatedModal({
            modalTarget:        'exitModal',
            animatedIn:         'slideInDown', //bounceIn
            animatedOut:        'slideOutDown', //bounceOut
            color:              '#76ebff',
            animationDuration:  '0.6s',
            beforeOpen: function() {
                //jQuery('#wrapper').addClass('blured');

                // Children animation
                var children = jQuery('.modal-content > *');
                var index = 0;

                function addClassNextChild() {
                    if (index == children.length) return;
                    children.eq(index++).addClass('animated bounce');
                    window.setTimeout(addClassNextChild, 0);
                }

                addClassNextChild();
            },
            afterOpen: function() {
                _paq.push(['trackEvent', 'Modal','Open','Exit']);
            },
            afterClose: function() {
                //jQuery('#wrapper').removeClass('blured');
                jQuery('.modal-content > *').removeClass('animated fadeInUp');
                _paq.push(['trackEvent', 'Modal','Close','Exit']);
            }
        }),
        exit = function() {
            jQuery('#toggle-exitModal').trigger('click');
            console.log(glio.statusTop);
            if (readCookie('name')) {
                //console.log(readCookie('name'));
                jQuery('#modal-result').html('<span>' + readCookie('name') + ', je vous recontacte très vite!!</span>');
            }
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
    glio.init(
      [ 'top', function () {
          exit();
        }
      ]
    );

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

        // Piwik event
        _paq.push(['trackEvent','Modal','Form','Push']);

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
                                .empty()
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
    galleryOldOpen = document.getElementById('open-gallery-old-btn'),
    galleryCrazyOpen = document.getElementById('open-gallery-crazy'),
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
                html: '<div class="pswp__html grid-column-center"><p class="" data-push-left="">VOUS SOUHAITEZ ME CONTACTER ?<br/><a class="icon" href="mailto:jbo@soapoperator.com" itemprop="email" data-button="Bouton email" onclick="javascript:_paq.push([\'trackEvent\', \'Gallery - Current\', \'Clic\', \'Email\']);">Envoyez-moi un email</a></p><div class="clear"></div></div>'
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

            // Piwik event
            _paq.push(['trackEvent', 'Gallery','Close','Current']);


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
                html: '<div class="pswp__html grid-column-center"><p class="" data-push-left="">VOUS SOUHAITEZ ME CONTACTER ?<br/><a class="icon" href="mailto:jbo@soapoperator.com" itemprop="email" data-button="Bouton email" onclick="javascript:_paq.push([\'trackEvent\', \'Gallery - Current\', \'Clic\', \'Email\']);">Envoyez-moi un email</a></p><div class="clear"></div></div>'
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

            // Piwik event
            _paq.push(['trackEvent', 'Gallery','Close','Old']);

            jQuery('#dialogue').addClass('escapeIn').removeClass('escapeOut');
            jQuery('#id').addClass('escapeIn').removeClass('escapeOut');
        });
    };
    openCrazyGallery = function() {

        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var itemsCrazy = [
            {
                html: '<div class="youtub grid-column-center"><div class="video-responsive"><iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/dly-gMAtu4U?enablejsapi=1" frameborder="0" allowfullscreen></iframe></div></div>'
            },
            {
                html: '<div class="pswp__html grid-column-center"><p class="" data-push-left="">VOUS SOUHAITEZ ME CONTACTER ?<br/><a class="icon" href="mailto:jbo@soapoperator.com" itemprop="email" data-button="Bouton email" onclick="javascript:_paq.push([\'trackEvent\', \'Gallery - Current\', \'Clic\', \'Email\']);">Envoyez-moi un email</a></p><div class="clear"></div></div>'
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
        var galleryCrazy = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, itemsCrazy, options);

        galleryCrazy.init();

        // After gallery is closed and closing animation finished.

        galleryCrazy.listen('destroy', function() {
            console.log('Gallery is closed!');

            // Piwik event
            _paq.push(['trackEvent', 'Gallery','Close','Crazy']);

            jQuery('#dialogue').addClass('escapeIn').removeClass('escapeOut');
            jQuery('#id').addClass('escapeIn').removeClass('escapeOut');
        });
    };

// Button to open the gallery
galleryCurrentOpen.onclick = openCurrentGallery;
galleryOldOpen.onclick = openOldGallery;
galleryCrazyOpen.onclick = openCrazyGallery;

// Open Gallery Function
jQuery('#dial').on('click','#gallery-project-current',function(event){
    event.preventDefault();
    jQuery('#dialogue').removeClass('escapeIn').addClass('animated escapeOut');
    jQuery('#id').removeClass('escapeIn').addClass('animated escapeOut');

    // Piwik event
    _paq.push(['trackEvent', 'Gallery','Open - Clic','Current']);

    setTimeout(function () {
        jQuery('#open-gallery-current-btn').trigger( 'click' );
    }, 400);
});
jQuery('#dial').on('click','#gallery-project-old',function(event){
    event.preventDefault();
    jQuery('#dialogue').removeClass('escapeIn').addClass('animated escapeOut');
    jQuery('#id').removeClass('escapeIn').addClass('animated escapeOut');

    // Piwik event
    _paq.push(['trackEvent', 'Gallery','Open - Clic','Old']);

    setTimeout(function () {
        jQuery('#open-gallery-old-btn').trigger( 'click' );
    }, 400);
});
jQuery('#dial').on('click','#gallery-project-crazy',function(event){
    event.preventDefault();
    jQuery('#dialogue').removeClass('escapeIn').addClass('animated escapeOut');
    jQuery('#id').removeClass('escapeIn').addClass('animated escapeOut');

    // Piwik event
    _paq.push(['trackEvent', 'Gallery','Open - Clic','Crazy']);

    setTimeout(function () {
        jQuery('#open-gallery-crazy').trigger( 'click' );
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
