"use strict";
var App = {};

$(function() {
	App.init();
});

App = {
	init : function(){
		this.imgToBackground();
		this.carousel();
		this.tabs();
	},
	menuTrigger: function(){
		$('.menu-trigger').on('click', function(e){
			e.preventDefault();
			$('body').toggleClass("menu-active");	
		});
	},
	imgToBackground : function(){
		$('.elem-bg').each(function(index, el) {
			var srcImg = $(el).find('.img-to-bg').attr('src');
			$(el).css('background-image','url('+ srcImg +')');
		});
	},
	onResize : function(callback){
		$(window).on('resize', function(){
			callback();
		});
	},
	isDesktop : function(){
		return ($(window).outerWidth() >= 768)? true : false;
	},
	goTo: function(){
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