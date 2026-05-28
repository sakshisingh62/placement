(function () {
	const slideCount = 5;
	let activeSlide = 0;

	const heroTrack = document.querySelector('[data-track]');
	const mobileTrack = document.querySelector('[data-mobile-track]');
	const heroDots = document.querySelector('[data-dots]');
	const mobileDots = document.querySelector('[data-mobile-dots]');
	const prevButtons = document.querySelectorAll('[data-prev], [data-mobile-prev]');
	const nextButtons = document.querySelectorAll('[data-next], [data-mobile-next]');

	function buildDots(container, isMobile) {
		container.innerHTML = '';
		for (let index = 0; index < slideCount; index += 1) {
			const dot = document.createElement('button');
			dot.type = 'button';
			dot.className = 'hero-dot';
			dot.setAttribute('aria-label', (isMobile ? 'Mobile ' : '') + 'Go to slide ' + (index + 1));
			dot.addEventListener('click', () => setSlide(index));
			container.appendChild(dot);
		}
	}

	function updateDots(container) {
		Array.from(container.children).forEach((dot, index) => {
			dot.classList.toggle('active', index === activeSlide);
			dot.setAttribute('aria-current', index === activeSlide ? 'true' : 'false');
		});
	}
	function setSlide(index) {
		activeSlide = (index + slideCount) % slideCount;
		if (heroTrack) {
			heroTrack.style.transform = 'translateX(' + (-activeSlide * 20) + '%)';
		}

		if (mobileTrack) {
			mobileTrack.style.transform = 'translateX(' + (-activeSlide * 20) + '%)';
		}

		if (heroDots) {
			updateDots(heroDots);
		}

		if (mobileDots) {
			updateDots(mobileDots);
		}
	}
	buildDots(heroDots, false);
	buildDots(mobileDots, true);
	setSlide(0);

	prevButtons.forEach((button) => {
		button.addEventListener('click', () => setSlide(activeSlide - 1));
	});

	nextButtons.forEach((button) => {
		button.addEventListener('click', () => setSlide(activeSlide + 1));
	});
})();
