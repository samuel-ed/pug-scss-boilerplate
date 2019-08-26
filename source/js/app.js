'use strict';
var App = {};

$(function() {
	App.init();
});

App = {
	init: function() {
		this.imageToBackground();
		this.imageToBackgroundExpand();
	},

	menuTrigger: function() {
		$('.menu-trigger').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('menu-active');
		});
	},

	imageToBackground: function() {
		$('.imgToBg_element').each(function(index, el) {
			var srcImg = $(el).find('.imgToBg_source').attr('src');
			$(el).css('background-image','url('+ srcImg +')');
		});
	},

	imageToBackgroundExpand: function() {
		var This = this;
		$('.imgToBgExpand').each(function(index, el) {
			var $bg = $(el).find('.imgToBgExpand_element'),
					srcImg = String($(el).find('.imgToBgExpand_source').attr('src'));
			$bg.css({'background-image': 'url('+ srcImg +')'});
			This.setElementWidth(el);
			This.onResize(function(){
				This.setElementWidth(el);
			});
		});
	},

	setElementWidth: function(el) {
		var $bg = $(el).find('.imgToBgExpand_element'),
				container = $('.container').outerWidth(),
				windowWidth = $(window).outerWidth(),
				expand = windowWidth-container,
				expandOneSide = expand/2,
				width = $(el).outerWidth(),
				widthBg = expand + width,
				widthBgOneSide = expandOneSide + width;

		$bg.css({'width': widthBgOneSide, 'margin-right':0, 'margin-left':0});
		if($(window).outerWidth() < 992){
			if($bg.hasClass('imgToBgExpand_element--left'))
				// $bg.css({'margin-right': -expandOneSide, 'width': widthBg});
				$bg.css({'margin-right': 0, 'width': widthBg});
			if($bg.hasClass('imgToBgExpand_element--right'))
				$bg.css({'margin-left': 0, 'width': widthBg});
		}
	},

	onResize: function(callback) {
		$(window).on('resize', function() {
			callback();
		});
	},

	isDesktop: function() {
		return ($(window).outerWidth() >= 768)? true : false;
	},

	goTo: function() {
		$('.goTo').each(function(index, el) {
			var anchor = $(el).attr('href');
			var pos = $(anchor).offset().top - 64;
			$(el).click(function() {
				$('html, body').animate({
					scrollTop: pos
				}, 500);
			});
		});
	},

};
