jQuery(document).ready(function($) {

	$(document).on("scroll", onScroll);

	// One page
	$('.main-menu a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		$(document).off("scroll");

		$('a').each(function () {
			$(this).parent().removeClass('active');
		})

		$(this).parent().addClass('active');
		var target = this.hash,
		menu = target;
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top+2
		}, 600, 'swing', function () {
			// window.location.hash = target;
			$(document).on("scroll", onScroll);
		});
	});

	// Scroll One-page
	function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$('.main-menu a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				currLink.parent().removeClass("active");
				currLink.parent().addClass("active");
			}
			else{
				currLink.parent().removeClass("active");
			}
		});
	}

	// Popup gallery picture
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				//return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});

	// Carousel
	var $owl = $('.owl-carousel');

	$owl.children().each( function( index ) {
	  $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
	});

	$owl.owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:8000,
		autoplayHoverPause:true,
		margin:10,
		nav:false,
		dotsEach: 1,
		responsive:{
			0:{
				items:1
			},
			480:{
				items:4
			},
			768:{
				items:4
			},
			1000:{
				items:4
			}
		},
		callbacks:{
			
		}
	});
	$(document).on('click', '.owl-item>div', function(e) {
		e.preventDefault();
		if( $(window).width() < 480 ) {
			return false;
		}
		$owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
		return false;
	});


	if( $('#countdown').length ) {
		// Set the date we're counting down to

		var _countdown = $('#countdown');
		var year = _countdown.attr('data-year');
		var month = _countdown.attr('data-month');
		var day = _countdown.attr('data-day');
		var hour = _countdown.attr('data-hour');
		var minute = _countdown.attr('data-minute');
		var second = _countdown.attr('data-second');

		if(typeof hour === "undefined"){
			hour = 0;
		}

		if(typeof minute === "undefined"){
			minute = 0;
		}

		if(typeof second === "undefined"){
			second = 0;
		}

		var countDownDate = new Date(year, month-1, day, hour, minute, second).getTime();


		// Update the count down every 1 second
		function cdInterval() {
			
			var _countdown = $('#countdown');
			// Get todays date and time
			var now = new Date().getTime();

			// Find the distance between now an the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Display the result in the element with class="countdown"
			var html =
			'<div class="days">' + '<span class="number">' + days + '</span>' + '<span class="text">Ngày</span>' + '</div>' +
			'<div class="hours">' + '<span class="number">' + hours + '</span>' + '<span class="text">Giờ</span>' + '</div>' +
			'<div class="minutes">' + '<span class="number">' + minutes + '</span>' + '<span class="text">Phút</span>' + '</div>' +
			'<div class="seconds">' + '<span class="number">' + seconds + '</span>' + '<span class="text">Giây</span>' + '</div>';  
			_countdown.html(html);

			// If the count down is finished, write some text 
			if (distance < 0) {
				clearInterval(cdInterval);
				_countdown.html('<div class="married">Đã Kết Hôn</div>');
			}else{
				setTimeout(cdInterval, 1000);
			}
			
		}
		cdInterval();
	}

});