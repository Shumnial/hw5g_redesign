$(() => {

	const newsBtn = $('.news__btn');
	const newsRowHidden = $('.news__row--hidden');
	const abilityNameDesktop = $('.abilities__name--desktop');
	const abilityNameMobile = $('.abilities__name--mobile');
	const popup = $('#popup');

	$('.slider-hot').slick({
		dots: true,
		arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: false,
	  autoplaySpeed: 2000,
	  centerMode: false,
	  centerPadding: '0px',
	  appendDots: $('.hot__dots')
	});

	$('.slider-info').slick({
		dots: true,
		arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  autoplay: true,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        dots: true,
	        arrows: false
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});

	$("#popup").iziModal({
		width: 1060,
		onClosed: onPopupClose,
		transitionIn: 'fadeIn',
    transitionOut: 'fadeOut'
	});

	function onPopupClose () {
		popup.find('.popup__video')[0].pause();
		$('body').css('overflow', 'auto');
		$('body').css('padding-right', '0px');
	}

	function onNewsBtnClick () {
		newsRowHidden.toggleClass('news__row--hidden');
		newsBtn.toggleClass('news__btn--hidden');
	}

	function onPosterClick (evt) {
		evt.preventDefault();
		const video = popup.find('video');
		const poster = $('.play');
		$('.popup__loader').show();
		video.attr('src', `${$(this).attr('data-video')}.mp4`);
    popup.iziModal('open');
    video[0].play();
    $('body').css('overflow', 'hidden');
    $('body').css('padding-right', '22px');
	}

	function onCrossClick () {
		popup.iziModal('close');
	}

	function onAbilityDesktopClick (evt) {
		let target = $(evt.currentTarget);
		let id = target.attr('href');
		evt.preventDefault();
		if (!$(this).hasClass('abilities__name--active')) {
			abilityNameDesktop.removeClass('abilities__name--active');
			target.addClass('abilities__name--active');
			$('.abilities__info').stop(true, true).hide();
			$(`.abilities__info[data-id=${id}]`).stop(true, true).slideDown();
		}
	}

	function onAbilityMobileClick (evt) {
		let target = $(evt.currentTarget);
		let id = target.attr('href');
		evt.preventDefault();
		if (!$(this).hasClass('abilities__name--active')) {
			abilityNameMobile.removeClass('abilities__name--active');
			target.addClass('abilities__name--active');
			$('.abilities__info-inner').slideUp();
			$(`.abilities__info[data-id=${id}]`).find('.abilities__info-inner').slideDown();
		} else {
			$('.abilities__info-inner').slideUp();
			target.removeClass('abilities__name--active');
		}
	}

	$('.nav__link').on('click', function (evt) {
		evt.preventDefault();
		const id  = $(this).attr('href');
		const top = $(id).offset().top;
		const headerHeight = $('#form1').height();
		const subnavHeight = $('.subnav').height();
		const indent = headerHeight + subnavHeight;
		$('body, html').animate({scrollTop: top - indent}, 1500);
	});

	function onPlaying () {
		$('.popup__loader').hide();
	}

	const headerHeight = $('header').height();
	function onScroll () {
		const target = $('.subnav');
		if ($(window).scrollTop() >= headerHeight) {
			target.css('position', 'fixed');
			target.css('top', '0');
		} else {
			target.css('position', 'static');
		}
	};

	newsBtn.on('click', onNewsBtnClick);
	$('.play').on('click', onPosterClick);
	$('video')[0].addEventListener('canplay', onPlaying)
	$('.popup__close').on('click', onCrossClick);
	abilityNameDesktop.on('click', onAbilityDesktopClick);
	abilityNameMobile.on('click', onAbilityMobileClick);
	$(document).on('scroll', onScroll);
})