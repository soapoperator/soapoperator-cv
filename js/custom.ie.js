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
// Piwik tracking
// ******************************************
function piwikEvent(n) {
    jQuery('#about-social').on('click touchstart', 'a', function(event) {
        var type = jQuery(this).data('button');
        _paq.push(['trackEvent', 'Social - IE', 'Clic', type]);
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

//===   On Ready Functions   ===//
var onready = function () {
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
