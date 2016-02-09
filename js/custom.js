jQuery.noConflict();

//===   On Ready Functions   ===//
var onready = function () {

    //  Background Text  //
    var window_w = jQuery(window).width(),
        window_h = jQuery(window).height(),
        BgText_H = jQuery('.background-text').outerHeight(true),
        BgText_W = jQuery('.background-text').outerWidth(true),
        BgText_repeat = Math.round( window_h / BgText_H ) + 3;
    for (i = 1; i < BgText_repeat; i++) {
        var source = jQuery('#background-text-'+i),
            clone = source.clone(),
            j = i + 1,
            f = (1000 + i*50);
        source.delay(f).fadeIn(f);
        clone.attr('id', 'background-text-'+j).insertAfter(jQuery('#background-text-'+i));
    }

	//  Iframe z-index fix  //
	jQuery('iframe:not(#hidden_iframe)').each(function(){
			var ifr_source = jQuery(this).attr('src'),
				wmode = "wmode=transparent";
			if(ifr_source.indexOf('?') != -1) {
				var getQString = ifr_source.split('?'),
					oldString = getQString[1],
					newString = getQString[0];
				jQuery(this).attr('src',newString+'?'+wmode+'&'+oldString);
			}
			else jQuery(this).attr('src',ifr_source+'?'+wmode);
		});

	//  Form Validation  //
	jQuery('#ss-form').validate({
			meta: 'validate',
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.insertBefore(element);
			},
			rules: {
				'entry.2082312161': {
					email: true
				}
			}
		});
	jQuery.extend(jQuery.validator.messages, {
			required:"Ce champ est obligatoire.",
			email: "Est-ce une adresse bien valide?",
		});
	jQuery('#ss-form').submit(function () {
			if (jQuery("#ss-form").valid() == true) {
				jQuery('#form_is_submitted').css('display', 'table-cell');
				jQuery("#ss-form").css('display', 'none');
				return true;
			}
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
