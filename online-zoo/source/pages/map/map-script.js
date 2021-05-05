'use strict';

// ОБЩИЕ ФУНКЦИИ
function addActiveClass(element, adClass) {
  element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
  element.classList.remove(adClass);
}

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
logo.src = localStorage.logo;

function changeTheme() {
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    logo.src = "../../assets/images/logo-online-zoo-footer.svg";
    localStorage.theme = document.body.className || 'dark-theme';
    localStorage.logo = logo.src || '../../assets/images/logo-online-zoo-footer.svg';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    logo.src = "../../assets/images/logo-online-zoo.svg";
    localStorage.theme = document.body.className || 'light-theme';
    localStorage.logo = logo.src || '../../assets/images/logo-online-zoo.svg';
  }
}

switchBtn.addEventListener('click', changeTheme);

// СЛАЙДЕР
const sliderChoose = document.querySelector('.choose__slider-list');
const btnsSliderChoose = document.querySelectorAll('.choose__slider-button');
const itemsSliderChoose = document.querySelectorAll('.choose__slider-item');
const rangeInputChoose = document.querySelector('.choose__range-input');
const rangeLabelChoose = document.querySelector('.choose__range-value');
let indexActive;
let newRangeValue;
let direction;
let widthActiveSlide;

function changeRangeLabelChoose(input, label) {
  if (direction === 'left') {
    input.value = indexActive;

    label.innerHTML = `0${indexActive}`;
  } else {
    label.innerHTML = `0${indexActive+2}`;
    input.value = indexActive + 2;
  }
}

function onClickSlideBtnChoose(evt) {
  itemsSliderChoose.forEach((slide, i) => {
    if (slide.classList.contains('choose__slider-item--active')) {
      removeActiveСlass(slide, 'choose__slider-item--active');
      indexActive = i;
    }
  });

  if (evt.currentTarget.classList.contains('choose__slider-button--left')) {
    direction = 'left';
    if (indexActive === 0) {
      indexActive = itemsSliderChoose.length;
    }

    addActiveClass(itemsSliderChoose[indexActive - 1], 'choose__slider-item--active');
  } else if (evt.currentTarget.classList.contains('choose__slider-button--right')) {
    direction = 'right';
    if (indexActive === itemsSliderChoose.length - 1) {
      indexActive = -1;
    }
    addActiveClass(itemsSliderChoose[indexActive + 1], 'choose__slider-item--active');
  }
  changeRangeLabelChoose(rangeInputChoose, rangeLabelChoose);
  isSlideVisible();
  addPinActive(indexActive);
  return indexActive;
}

btnsSliderChoose.forEach(button => {
  button.addEventListener('click', onClickSlideBtnChoose);
});
let indexPrevActive;

function onClickOnSlide(evt) {
  const currentSlide = evt.currentTarget;

  if (currentSlide.classList.contains('choose__slider-item')) {
    itemsSliderChoose.forEach((slide, index) => {
      if (slide.classList.contains('choose__slider-item--active')) {
        indexPrevActive = index;
      }
    });

    itemsSliderChoose.forEach((slide, i) => {
      removeActiveСlass(slide, 'choose__slider-item--active');
      addActiveClass(currentSlide, 'choose__slider-item--active');
    });

    indexActive = Array.from(itemsSliderChoose).indexOf(currentSlide);

    if (indexActive < indexPrevActive) {
      direction = 'left';
      indexActive++;
    } else {
      direction = 'right';
      indexActive--;
    }
  }
  changeRangeLabelChoose(rangeInputChoose, rangeLabelChoose);
  isSlideVisible();
  addPinActive(indexActive);
  return indexActive;
}

itemsSliderChoose.forEach(slide => {
  slide.addEventListener('click', onClickOnSlide);
});

function onClickRangeChoose(evt) {
  itemsSliderChoose.forEach((slide, i) => {
    if (slide.classList.contains('choose__slider-item--active')) {
      indexActive = i;
      removeActiveСlass(slide, 'choose__slider-item--active');
    }
  });
  if (evt.target.value < indexActive + 1) {
    direction = 'left';
  } else if (evt.target.value > indexActive + 1) {
    direction = 'right';
  }
  addActiveClass(itemsSliderChoose[evt.target.value - 1], 'choose__slider-item--active');
  changeRangeLabelChoose(rangeInputChoose, rangeLabelChoose);
  isSlideVisible();
  addPinActive(indexActive);
  return indexActive;
}

rangeInputChoose.addEventListener("input", onClickRangeChoose);

function getViewPortWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function isSlideVisible() {
  const viewPortWidth = getViewPortWidth();
  itemsSliderChoose.forEach((slide, i) => {
    if (slide.classList.contains('choose__slider-item--active')) {
      indexActive = i;
      widthActiveSlide = slide.offsetWidth;
    }
  });

  if (viewPortWidth <= 1200) {
    if (itemsSliderChoose[indexActive].getBoundingClientRect().left > sliderChoose.getBoundingClientRect().left &&
      itemsSliderChoose[indexActive].getBoundingClientRect().right > sliderChoose.getBoundingClientRect().right) {
      if (indexActive > 4) {
        let number = indexActive - 4;
        sliderChoose.scrollBy(number * widthActiveSlide, 0);
        return;
      }
    } else if (itemsSliderChoose[indexActive].getBoundingClientRect().left < sliderChoose.getBoundingClientRect().left &&
      itemsSliderChoose[indexActive].getBoundingClientRect().right < sliderChoose.getBoundingClientRect().right) {
      if (indexActive < 4) {
        let number = indexActive + 1;
        sliderChoose.scrollBy(-number * widthActiveSlide, 0);
        return;
      }
    } else {
      return;
    }
  }
}

isSlideVisible();

window.addEventListener('resize', isSlideVisible);

const mapPins = document.querySelectorAll('.map__pin-wrapper-img');
let mapWatchBtn = document.querySelector('.map__link--map-page');
let pinDataAnimal;
let indexActivePin;

function addPinActive(indexActive) {
  let slideDataAnimal = itemsSliderChoose[indexActive].dataset.animal; //panda
  console.log(slideDataAnimal);
  if (slideDataAnimal) {
    mapPins.forEach((pin, index) => {
      removeActiveСlass(pin, 'map__pin-wrapper-img--active');
      if (pin.dataset.animal === slideDataAnimal) {
        pinDataAnimal = mapPins[index];
        indexActivePin = index;
        mapWatchBtn.href = `../zoos-${slideDataAnimal}/zoos-${slideDataAnimal}.html`;
      }
    });
    addActiveClass(pinDataAnimal, 'map__pin-wrapper-img--active');
  } else {
    mapPins.forEach((pin) => {
      removeActiveСlass(pin, 'map__pin-wrapper-img--active');
    });
    mapWatchBtn.href = '#';
  }
  return indexActivePin;
}

addPinActive(indexActive);

function addSlideActive(evt) {
  const currentPin = evt.currentTarget;
  mapPins.forEach((pin) => {
    removeActiveСlass(pin, 'map__pin-wrapper-img--active');
  });
  addActiveClass(currentPin, 'map__pin-wrapper-img--active');
  mapPins.forEach((pin, index) => {
    if (pin.classList.contains('map__pin-wrapper-img--active')) {
      indexActivePin = index;
    }
  });
  pinDataAnimal = mapPins[indexActivePin].dataset.animal;

  itemsSliderChoose.forEach(slide => {
    removeActiveСlass(slide, 'choose__slider-item--active');
    if (slide.dataset.animal === pinDataAnimal) {
      addActiveClass(slide, 'choose__slider-item--active');
    }
  });
  isSlideVisible();
}

mapPins.forEach(pin => {
  pin.addEventListener('click', addSlideActive);
});
