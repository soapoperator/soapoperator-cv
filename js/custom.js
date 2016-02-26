jQuery.noConflict();

//===   On Ready Functions   ===//
var onready = function () {

    //  Iframe z-index fix  //
    jQuery('iframe:not(#hidden_iframe)').each(function () {
        var ifr_source = jQuery(this).attr('src'),
            wmode = "wmode=transparent";
        if (ifr_source.indexOf('?') != -1) {
            var getQString = ifr_source.split('?'),
                oldString = getQString[1],
                newString = getQString[0];
            jQuery(this).attr('src', newString + '?' + wmode + '&' + oldString);
        } else jQuery(this).attr('src', ifr_source + '?' + wmode);
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
