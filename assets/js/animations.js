(() => {
	const STAGGER_DELAY = 100;

	const init = () => {
		const elements = document.querySelectorAll(
			'.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right'
		);
		const staggerParents = document.querySelectorAll('.stagger-children');

		if (!elements.length && !staggerParents.length) return;

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		}, { threshold: 0.25 });

		elements.forEach((el) => observer.observe(el));

		const staggerObserver = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				[...entry.target.children].forEach((child, i) => {
					setTimeout(() => child.classList.add('is-visible'), i * STAGGER_DELAY);
				});
				staggerObserver.unobserve(entry.target);
			}
		}, { threshold: .2 });

		staggerParents.forEach((el) => staggerObserver.observe(el));
	};

	document.addEventListener('DOMContentLoaded', init);
})();
