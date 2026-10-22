document.addEventListener('DOMContentLoaded', function() {

	let swipers = document.querySelectorAll('[data-bss-swiper]');
	let swiperNavigations = document.querySelectorAll('.swiper-nav-standalone');

	for (let swiper of swipers) {
		if (typeof Swiper !== 'function') {
			console.error('Swiper is required for elements with data-bss-swiper.');
			break;
		}

		let config;

		try {
			config = JSON.parse(swiper.dataset.bssSwiper);
		} catch (error) {
			console.error('Invalid swiper configuration:', error);
			continue;
		}

		if (!config || typeof config !== 'object' || Array.isArray(config)) {
			console.error('Swiper configuration must be an object.');
			continue;
		}

		if (!swiper.id) {
			console.error('Swiper elements initialized by bs-init.js require an ID.');
			continue;
		}

		if (!config.navigation) {
			config.navigation = {};

			for (let swiperNavigation of swiperNavigations) {
				if (swiperNavigation.dataset.bssSwiperTarget === '#' + swiper.id) {
					let prevEl = swiperNavigation.querySelector('.swiper-button-prev');
					let nextEl = swiperNavigation.querySelector('.swiper-button-next');

					if (prevEl && nextEl) {
						config.navigation.prevEl = prevEl;
						config.navigation.nextEl = nextEl;
					}
					break;
				}
			}
		}

		let slider = new Swiper(swiper, config);
	}
}, false);
