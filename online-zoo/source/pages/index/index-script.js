'use strict';

// СЛАЙДЕР WATCH
const sliderWatch = document.querySelector('.watch__slider-list');
const itemSliderWatch = sliderWatch.querySelectorAll('.watch__slider-item');
const activeSlide = document.querySelector('.watch__slider-item--active');


function addActiveClass(element, adClass) {
  element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
  element.classList.remove(adClass);
}

function onSlide(evt) {

  const slide = evt.currentTarget;

  if (slide.classList.contains('watch__slider-item')) {
    activeSlide.classList.remove('watch__slider-item--active');
    if (slide.classList.contains('watch__slider-item--active')) {
      slide.classList.remove('watch__slider-item--active');
    }
  }
}

function outSlide() {
  activeSlide.classList.add('watch__slider-item--active');
}

itemSliderWatch.forEach(slide => {
  slide.addEventListener('mouseover', onSlide);
  slide.addEventListener('mouseout', outSlide);
});

// БУРГЕР
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navToggle.classList.add('menu-opened');
    navToggle.classList.remove('menu-closed');
  } else {
    navMain.classList.add('main-nav--closed');
    navToggle.classList.remove('menu-opened');
    navToggle.classList.add('menu-closed');
  }
});
