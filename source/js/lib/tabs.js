(function ($) {
		var methods = {
			init : function() {
				return this.each(function(i, el) {
					var $this = $(el);
					var tabsContent = ( $this.attr('data-tabs') )? $this.attr('data-tabs') : $this.attr('id');
					
					$this.find('.tab').each(function(index, element) {
						var elClickeable = ( $(element).hasClass('tab-link') )? element : $(element).find('.tab-link');
						onTabClick(element, elClickeable, tabsContent);
					});

					function onTabClick(tab, elClickeable, tabs) {
						$(elClickeable).on('click', function(event){
							var tabPanelId = $(this).attr('href'),
									tabPanel = tabPanelId.split("#")[1],
									$dataTabs = $('[data-tabs='+tabs+']'),
									$dataTabsContent = $('[data-tabs-content='+tabs+']');

							if ( $dataTabs.length > 0 ){
								$dataTabs.find('.tab').removeClass("active");
								$(tab).addClass('active');
								$dataTabsContent.children('.tabs-panel')
									.removeClass("active")
									.each(function(index, element){
									if ( $(element).attr("id") === tabPanel ){
										$(element).addClass('active');
									}
								});
							} else {
								$("#"+tabs).find('.tab').removeClass("active");
								// console.log($("#"+tabs).find('.tab'));
								$dataTabsContent.children('.tabs-panel').removeClass("active");
								$(tabPanelId).addClass("active");
								$(tab).addClass('active');
							}
							event.preventDefault();
						});
					}
				});
			}
		};
	
		$.fn.tabs = function(methodOrOptions) {
			if ( methods[methodOrOptions] ) {
				return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
				// Default to "init"
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tabs' );
			}
		};
	
		$(document).ready(function(){
			$('.tabs').tabs();
		});
	}( jQuery ));