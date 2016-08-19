(() => {
	const DELAY = 5000;

	new Swiper('#focus', {
		simulateTouch: false,
		pagination: '.focus-indexes',
		paginationClickable: true,
		useCSS3Transforms: false,
		loop: true,
		autoplay: DELAY,

		onSlideChangeStart(swiper) {
			setTimeout(swiper.swipeNext.bind(swiper), DELAY);
		}
	});
})();