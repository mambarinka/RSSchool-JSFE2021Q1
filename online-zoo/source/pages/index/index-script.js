'use strict';

let lengthMove = 0;
let numberSlide;
let newRangeValue;
let isClickOnSlide = false;

function addActiveClass(element, adClass) {
  element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
  element.classList.remove(adClass);
}

function moveSlide(slides, targetSlide, activeSlide, widthSlide, sliderList) {
  let numberActiveSlide = Array.from(slides).indexOf(activeSlide) + 1;

  if (targetSlide) {
    numberSlide = Array.from(slides).indexOf(targetSlide) + 1;
    lengthMove = -(numberSlide - numberActiveSlide) * widthSlide;
  } else {
    lengthMove = -(newRangeValue - numberActiveSlide) * widthSlideWatch;
  }

  sliderList.style.transitionDuration = `1000ms`;
  sliderList.style.transform = `translateX(${lengthMove}px)`;
  return numberSlide;
}

function changeRangeLabel(input, label) {
  if (!isClickOnSlide) {
    newRangeValue = input.value;
    label.innerHTML = `0${newRangeValue}`;
    return newRangeValue;
  } else {
    input.value = numberSlide;
    label.innerHTML = `0${numberSlide}`;
    return;
  }
}

// СЛАЙДЕР WATCH
const sliderWatch = document.querySelector('.watch__slider-list');
const itemSliderWatch = sliderWatch.querySelectorAll('.watch__slider-item');
const activeSlideWatch = document.querySelector('.watch__slider-item--active');
const rangeInputWatch = document.querySelector('.watch__range-input');
const rangeLabelWatch = document.querySelector('.watch__range-value');
let widthSlideWatch = 186;

function onClickSlideWatch(evt) {
  const slide = evt.currentTarget;
  if (slide.classList.contains('watch__slider-item')) {
    isClickOnSlide = true;

    moveSlide(itemSliderWatch, slide, activeSlideWatch, widthSlideWatch, sliderWatch);
    changeRangeLabel(rangeInputWatch, rangeLabelWatch);

    itemSliderWatch.forEach((slide, i) => {
      removeActiveСlass(slide, 'watch__slider-item--active');
    });
    addActiveClass(slide, 'watch__slider-item--active');
  } else {
    isClickOnSlide = false;
  }
}

itemSliderWatch.forEach(slide => {
  slide.addEventListener('click', onClickSlideWatch);
});

function onClickRangeWatch() {
  isClickOnSlide = false;
  moveSlide(itemSliderWatch, null, activeSlideWatch, widthSlideWatch, sliderWatch);
  changeRangeLabel(rangeInputWatch, rangeLabelWatch);

  itemSliderWatch.forEach((slide) => {
    removeActiveСlass(slide, 'watch__slider-item--active');
  });
  addActiveClass(itemSliderWatch[newRangeValue - 1], 'watch__slider-item--active');
}

rangeInputWatch.addEventListener("input", onClickRangeWatch);

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

// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
const switchBtn = document.querySelector('.switch__slider');
const body = document.querySelector('body');
const logo = body.querySelector('.logo__image');

if (!localStorage.theme) {
  localStorage.theme = 'light-theme';
}

document.body.className = localStorage.theme;

function changeTheme() {
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    logo.src = "../../assets/images/logo-online-zoo-footer.svg";
    localStorage.theme = document.body.className || 'dark-theme';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    logo.src = "../../assets/images/logo-online-zoo.svg";
    localStorage.theme = document.body.className || 'light-theme';
  }
}

switchBtn.addEventListener('click', changeTheme);
