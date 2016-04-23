window.Axis = {
	keyscrollOffset: function() {
		var mob = $('#mob_nav');
		return mob.is(':visible') ? -48 : 0;
	},

	Pillar: {
		spacing: false,
		maxCols: false,
		init: function() {
			if ($('.kpgrid_content').length) {
				$('.kpgrid_content')
					.pillar({
						items: '.kpgriditem',
						spacing: this.spacing,
						gutter: 0,
						flush: true,
						columns: {
							'479': this.mobCol,
							'767': this.mobCol,
							'959': this.tabletCol,
							'max': this.maxCols // Width > than highest set width (949 in this case) get 5 columns; max is required when using breakpoints
						},
						imageLoaded: function() {
							$(this).closest('.kpgriditem').addClass('loaded')
						},
						variability: this.variability,
						variabilityAmt: this.variability_amt
					});
			} else {
				$K.infinity.resume();
			}
		}
	}
};

$(document)

	.on('k-image-loading', function(e, img) {

		$(e.target).parent().parent().find('.spinner_pos').addClass('active');

		var $img = $(img),
			$embed = $img.closest('.k-content-embed');

		if ($embed.length) {
			$embed
				.prepend('<div class="spinner_pos active"><div class="spinner"></div></div>')
				.css('position', 'relative');
		}
	})

	.on('koken:lightbox:loading', function(e, img) {
		var $img = $(img);

		$img
			.prepend('<div class="spinner_pos spinner_lightbox active"><div class="spinner"></div></div>')
			.css('position', 'relative');
	})

	.on('koken:lightbox:loaded', function(e, img) {
		$('.spinner_lightbox').remove();
	})

	.on('k-img-resize', function(e, img) {
		var $img = $(img);
		if ($img.hasClass('k-lazy-loading')) {
			$img.parent().parent().find('.spinner_pos').addClass('active');
		}
	})

	.on('k-image-fading', function(e) {
		$(e.target).parent().parent().find('.spinner_pos').removeClass('active');
	})

	.on('k-image-loaded', function(e, img) {
		$(e.target).parent().find('.spinner_pos').remove();

		var $img = $(img),
			$embed = $img.closest('.k-content-embed');

		if ($embed.length) {
			$embed.find('.spinner_pos').remove();
		}
	})

	.on('click', '#backtop', function() {
		$.scrollTo(this.hash, 400, {easing:'swing'} );
		return false;
	})

	.on('click', '#backtop_mob', function() {
		$.scrollTo(this.hash, 400, {easing:'swing'} );
		return false;
	})

	.on('pjax:timeout', function(event) {
		// Prevent default timeout redirection behavior
		event.preventDefault()
	});

$(function() {

	var Mobile = function(opts) {
		this.button = $(opts.button);
		this.container = $(opts.container);
		this.content = $(opts.content);

		$(window).on('resize.mob', function() {
			if ($(this.container).height() <= 0) $(this.container).css('height', this.button.outerHeight());
			$(this.content).css('margin-top', this.button.outerHeight());
			if ($('html').hasClass('k_mob_open') && window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
				$(this.container).css('height', 'auto');
				window.setTimeout(function() {
					$(this.container).css('height', $(this.container).height());
				}, 1);
			}
		}.bind(this)).trigger('resize.mob');

		$(document).on('click.mob', this.button, function(e) {
			if (!$(e.target).closest(opts.button).length) return true;

			e.preventDefault();

			var isOpen = $('html').hasClass('k_mob_open');

			$(this.button).toggleClass('open');
			$('html').toggleClass('k_mob_open');

			var target_h = this.button.outerHeight() + this.content.outerHeight(),
				win_h = $(window).height(),
				mq = window.matchMedia && window.matchMedia( "(max-width: 767px)" );

			if (mq.matches && target_h > win_h) target_h = win_h;

			$(this.container).css('height', (isOpen) ? this.button.outerHeight() : target_h);

		}.bind(this));
	}

	new Mobile({
		button: '#mt',
		container: '#mob_nav',
		content: '.mob_nav_content'
	});

	Axis.Pillar.init();

	$('#backtop').hide();
	$('#backtop_mob').hide();

	if (window.matchMedia) {
		var scroll_target = 300;
		var mq = window.matchMedia( "(max-width: 767px)" );

		$(window).scroll(function () {
			if ($(this).scrollTop() > scroll_target) {
				if (mq.matches) {
					$('#backtop_mob').fadeIn();
				} else {
					$('#backtop').fadeIn();
				}
			} else {
				if (mq.matches) {
					$('#backtop_mob').fadeOut();
				} else {
					$('#backtop').fadeOut();
				}
			}
		});
	}

	$(window).on('resize k-pjax-end', function() {

		if (($('body').hasClass('k-lens-index') || $('body').hasClass('k-lens-featured_albums')) && $('.slideshow').length) {
			var h = Math.floor($(this).height() - $('.slideshow').offset().top - parseInt($('.slideshow').css('margin-bottom')));
			var mq = window.matchMedia && window.matchMedia( "(max-width: 767px)" );

			if (!mq.matches && $('footer.bot').is(":visible")) {
				h -= $('footer.bot').outerHeight(true);
			} else {
				h -= parseInt($('main').css('margin-top'));
			}
			if (h < 100) { h = 100; }
			$('.slideshow').css('height', Math.min(h, $('.slideshow').width()));
		}

		if ($('.limit_slideshow').length) {
			var h = Math.floor($(this).height() - ($('.nav_content').outerHeight(true) + (parseInt($('.nav_content').css('margin-bottom')) * 2) ));
			$('.slideshow').css('height', Math.min(h, $('.slideshow').width()));
		}

		if ($('img.height_limit').length) {
			var mh = $(this).height() - 20;
			if ($('#mob_nav').is(":visible")) {
				mh -= $('#mob_nav').height();
			}
			$('img.height_limit').css({
				maxHeight: mh + 'px',
				width: 'auto'
			});
		}

		if ($('img.content_vfit').length) {
			var h = ( $(this).height() - ($('.main-content').offset().top + parseInt($('.nav_content').css('margin-bottom'))) );
			$('img.content_vfit').css({
				maxHeight: h + 'px',
				width: 'auto'
			});
		}

	}).trigger('resize');

	$.pjaxTransition({
		linkSelector: '.nav_content [data-paginate-pjax]',
		loadWhileAnimating: true,
		scrollTo: false
	});

    var swiftclick = SwiftClick.attach(document.body);
});