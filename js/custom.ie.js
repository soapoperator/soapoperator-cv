/* minifyOnSave, minifier:uglify-js, filenamePattern: $1.min.$2 */

jQuery.noConflict();

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
