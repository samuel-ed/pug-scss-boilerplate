"use strict";
var Ie8 = {};

$(function() {
	Ie8.init();
});

Ie8 = {
	init : function(){
		if (!Modernizr.svg) {
			this.replacePseudoElements();
			this.inputPlaceholder();
			this.replaceSvg();
		}
	},
	replaceSvg : function(){
		$("img[src$='.svg']").each(function(index, el) {
			var srcImg = $(el).attr('src');
			srcImg = srcImg.split(".svg")[0] + ".png";
			$(el).attr('src', srcImg);
		});
	},
	inputPlaceholder : function(params) {
		if ($('input, textarea').length > 0) {
			$('input, textarea').placeholder(); 
		}
	},
	replacePseudoElements: function(){
		$('.navigation_link').each(function(index, el) {
			$(el).append('<span class="navigation_active-icon"></span>');
		});
		$('.collapsible_header').each(function(index, el) {
			$(el).append('<span class="collapsible_active-icon"></span>');
		});
	}
};