'use strict';

// СЛАЙДЕР WATCH
const sliderWatch = document.querySelector('.watch__slider-list');
const itemSliderWatch = sliderWatch.querySelectorAll('.watch__slider-item');
const activeSlide = document.querySelector('.watch__slider-item--active');
let widthWatchSlide = 186;
let lengthMove = 0;

// const coordsX = (element) => {
//   return element.getBoundingClientRect().x;
// };

// const coordsY = (element) => {
//   return element.getBoundingClientRect().y;
// };

function addActiveClass(element, adClass) {
  element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
  element.classList.remove(adClass);
}

// function onSlide(evt) {
//   const slide = evt.currentTarget;
//   if (slide.classList.contains('watch__slider-item')) {
//     activeSlide.classList.remove('watch__slider-item--active');
//     if (slide.classList.contains('watch__slider-item--active')) {
//       slide.classList.remove('watch__slider-item--active');
//     }
//   }
// }

// // function outSlide() {
// //   activeSlide.classList.add('watch__slider-item--active');
// // }

// itemSliderWatch.forEach(slide => {
//   slide.addEventListener('mouseover', onSlide);
//   // slide.addEventListener('mouseout', outSlide);
// });

function clickSlide(evt, elem, index) {
  const slide = evt.currentTarget;
  console.log(`index: ${index}`);
  console.dir(evt);
  if (slide.classList.contains('watch__slider-item')) {
    let numberSlide = Array.from(itemSliderWatch).indexOf(slide) + 1;
    let numberActiveSlide = Array.from(itemSliderWatch).indexOf(activeSlide) + 1;
    lengthMove = -(numberSlide - numberActiveSlide) * widthWatchSlide;
    itemSliderWatch.forEach((slide, i) => {
      removeActiveСlass(slide, 'watch__slider-item--active');
    });
    slide.classList.add('watch__slider-item--active');
    sliderWatch.style.transitionDuration = `1000ms`;
    sliderWatch.style.transform = `translateX(${lengthMove}px)`;

  }
}

itemSliderWatch.forEach(slide => {
  slide.addEventListener('click', clickSlide);
});

// ПРИВЯЗКА ПОЛОСЫ ПРОГРЕССА К СЛАЙДЕРУ

const rangeInput = document.querySelector('.watch__range-input');

function rangeValue() {
  let newValue = rangeInput.value;
  let target = document.querySelector('.watch__range-value');
  target.innerHTML = `0${newValue}`;
  let numberActiveSlide = Array.from(itemSliderWatch).indexOf(activeSlide) + 1;
  lengthMove = -(newValue - numberActiveSlide) * widthWatchSlide;
  console.log(lengthMove);

  itemSliderWatch.forEach((slide, i) => {
    removeActiveСlass(slide, 'watch__slider-item--active');
  });
  itemSliderWatch[newValue - 1].classList.add('watch__slider-item--active');
  sliderWatch.style.transitionDuration = `1000ms`;
  sliderWatch.style.transform = `translateX(${lengthMove}px)`;
}

rangeInput.addEventListener("input", rangeValue);

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
