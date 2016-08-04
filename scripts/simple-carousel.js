function simpleCarousel(carouselElement, options){
	if ( (function(){
		//validate options
		return true;
	})(options) ){
		this.options = options;
	}else{
		this.options = {// set defaults
			transitionTime : 500
		}
	}
	this.carousel = carouselElement;
	this.slides = [];
	this.sliderContentHolder = this.carousel.querySelector('.slider-content');
	this.currentSlideIndex;

}

simpleCarousel.prototype.initialize= function(){
	this.evaluateSlides();
	this.registerControlsHandlers();
	this.setOptions();
};
simpleCarousel.prototype.setOptions = function(){
	this.slides[0].el.style.marginLeft = '0px';
	this.slides[0].el.style.transition = `margin-left ${this.options.transitionTime}ms`;
}
simpleCarousel.prototype.evaluateSlides = function(){
	let self = this;

	let slideElements = this.carousel.querySelectorAll('.slider-content > img');
	let sliderControlsListElement = this.carousel.querySelector('.slider-controls > ul');

	sliderControlsListElement.innerHTML = "";

	slideElements.forEach(function(e,i,a){
		let liControl = document.createElement('li');

		let reference = `${i}`;
		liControl.dataset.slideId = reference;
		e.dataset.controlId = reference;

		if( i === 0 )
			liControl.classList.add('current');

		sliderControlsListElement.appendChild(liControl);
		self.slides.push({el:e,c:liControl,ref:reference});
	});

	this.currentSlideIndex = 0;
}

simpleCarousel.prototype.registerControlsHandlers= function(){
	let self = this;
	this.slides.forEach(function(el){
		el.c.addEventListener('click',function(evnt){
			self.moveTo(parseInt(evnt.target.dataset.slideId));
		},false);
	});
}
simpleCarousel.prototype.moveTo = function(nextIndex){
	let self = this;
	let sliderWidth = this.sliderContentHolder.clientWidth;

	window.setTimeout(function(){
		self.slides[self.currentSlideIndex].c.classList.remove('current');
		self.slides[nextIndex].c.classList.add('current');
		self.currentSlideIndex= nextIndex;
	},this.options.transitionTime);

	this.slides[0].el.style.marginLeft = `-${nextIndex*sliderWidth}px`;
}
