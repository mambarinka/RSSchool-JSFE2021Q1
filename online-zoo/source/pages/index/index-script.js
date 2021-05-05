'use strict';

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

// ОБЩИЕ ФУНКЦИИ
let numberSlide;
let newRangeValue;

function addActiveClass(element, adClass) {
  element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
  element.classList.remove(adClass);
}

// СЛАЙДЕР WATCH
const sliderWatch = document.querySelector('.watch__slider-list');
const itemsSliderWatch = sliderWatch.querySelectorAll('.watch__slider-item');
const activeSlideWatch = document.querySelector('.watch__slider-item--active');
const rangeInputWatch = document.querySelector('.watch__range-input');
const rangeLabelWatch = document.querySelector('.watch__range-value');
let widthSlideWatch = itemsSliderWatch[0].offsetWidth;
let lengthMove = 0;

function moveSlideWatch(slides, targetSlide, activeSlide, widthSlide, sliderList, input) {
  let numberActiveSlide = Array.from(slides).indexOf(activeSlide) + 1;

  if (targetSlide) {
    numberSlide = Array.from(slides).indexOf(targetSlide) + 1;
    lengthMove = -(numberSlide - numberActiveSlide) * widthSlide;
  } else {
    newRangeValue = input.value;
    lengthMove = -(newRangeValue - numberActiveSlide) * widthSlideWatch;
    console.log(`lengthMove(${lengthMove} = -(newRangeValue(${newRangeValue}) - numberActiveSlide(${numberActiveSlide})) * widthSlideWatch(${widthSlideWatch})`);
  }

  sliderList.style.transitionDuration = `1000ms`;
  sliderList.style.transform = `translateX(${lengthMove}px)`;
  return numberSlide;
}

let isClickOnSlide = false;

function changeRangeLabelWatch(input, label) {
  if (!isClickOnSlide) {
    newRangeValue = input.value;
    label.innerHTML = `0${newRangeValue}`;
  } else if (isClickOnSlide) {
    input.value = numberSlide;
    label.innerHTML = `0${numberSlide}`;
  }
  return newRangeValue;
}

function onClickSlideWatch(evt) {
  const currentSlide = evt.currentTarget;
  if (currentSlide.classList.contains('watch__slider-item')) {
    isClickOnSlide = true;

    moveSlideWatch(itemsSliderWatch, currentSlide, activeSlideWatch, widthSlideWatch, sliderWatch, null);
    changeRangeLabelWatch(rangeInputWatch, rangeLabelWatch);

    itemsSliderWatch.forEach((slide) => {
      removeActiveСlass(slide, 'watch__slider-item--active');
    });
    addActiveClass(currentSlide, 'watch__slider-item--active');
  } else {
    isClickOnSlide = false;
  }
}

itemsSliderWatch.forEach(slide => {
  slide.addEventListener('click', onClickSlideWatch);
});

function onClickRangeWatch() {
  isClickOnSlide = false;
  moveSlideWatch(itemsSliderWatch, null, activeSlideWatch, widthSlideWatch, sliderWatch, rangeInputWatch);
  changeRangeLabelWatch(rangeInputWatch, rangeLabelWatch);

  itemsSliderWatch.forEach((slide) => {
    removeActiveСlass(slide, 'watch__slider-item--active');
  });
  addActiveClass(itemsSliderWatch[newRangeValue - 1], 'watch__slider-item--active');
}

rangeInputWatch.addEventListener("input", onClickRangeWatch);

// СЛАЙДЕР PETS IN ZOO
const sliderPetsInZoo = document.querySelector('.pets-in-zoo__slider-list');
const btnsSliderPetsInZoo = document.querySelectorAll('.pets-in-zoo__slider-button');
const rangeInputPetsInZoo = document.querySelector('.pets-in-zoo__range-input');
const rangeLabelPetInZoo = document.querySelector('.pets-in-zoo__value--active');
const numberNewSlides = 24;
const numberActiveSlides = 4;
let isClickOnBtn = false;

//  шаблон слайда
const slideTemplate = document.querySelector('#pets-slide')
  .content
  .querySelector('.pets-in-zoo__slider-item');

//  функция создания DOM-элемента на основе шаблона слайда
const createSlide = (slide) => {
  const newSlide = slideTemplate.cloneNode(true);
  newSlide.querySelector('img').src = slide.image;
  newSlide.querySelector('img').alt = slide.alt;
  return newSlide;
};

const makeFragment = (elements) => {
  let pinsfragment = document.createDocumentFragment();
  for (let j = 0; j < elements.length; j++) {
    const slideElement = createSlide(elements[j]);
    pinsfragment.appendChild(slideElement);
  }
  return pinsfragment;
};

const getSlides = (i) => {
  const slideObj = {
    image: `../../assets/images/slider-pets-in-zoo-new/slider-pets-in-zoo-template (${i+1}).jpg`,
    alt: `Panda’s name is Bei Bei. He
    is&nbsp;2&nbsp;years old. Bei Bei is from China. He loves bamboos.`
  };
  return slideObj;
};

// создание массива новых слайдов
const createArrayItems = (limit, getContent) => {
  let slides = [];

  for (let i = 0; i < limit; i++) {
    slides[i] = getContent(i);
  }
  return slides;
};

const getNewSlides = () => {
  const newSlides = createArrayItems(numberNewSlides, getSlides);
  return newSlides;
};

const slides = getNewSlides();

const addNewSlides = () => {
  const fragmentWithSlides = makeFragment(slides);
  sliderPetsInZoo.append(fragmentWithSlides);
};

addNewSlides();

const itemsSliderPetsInZoo = Array.from(document.querySelectorAll('.pets-in-zoo__slider-item'));
let now = 0;

function moveSlidePetInZoo(sliderItems, ratio) {
  lengthMove = numberActiveSlides * 100;

  sliderItems.forEach((slide) => {
    slide.style.transitionDuration = `1000ms`;
    slide.style.transform = `translateX(-${ratio*lengthMove}%)`;
  });
}

function changeRangeLabePetsInZoo(input, label, ratio) {
  if (!isClickOnBtn) {
    newRangeValue = input.value;
    label.innerHTML = `0${newRangeValue}`;
  } else if (isClickOnBtn) {
    input.value = ratio + 1;
    label.innerHTML = `0${ratio+1}`;
  }
  return newRangeValue;
}

function onClickSlideBtnPetsInZoo(evt) {
  if (evt.currentTarget.classList.contains('pets-in-zoo__slider-button--left')) {
    isClickOnBtn = true;
    --now;
    if (now <= -1) { // если залезли в отрицательную область, делаем текущей последнюю картинку
      now = itemsSliderPetsInZoo.length / 4 - now - 2;
    }
  } else if (evt.currentTarget.classList.contains('pets-in-zoo__slider-button--right')) {
    isClickOnBtn = true;
    ++now;
    if (now >= itemsSliderPetsInZoo.length / 4) {
      now = 0; // если индекс больше, чем может быть, делаем текущей первую картинку
    }
  } else {
    isClickOnBtn = false;
  }

  // console.log(isClickOnBtn);
  moveSlidePetInZoo(itemsSliderPetsInZoo, now);
  changeRangeLabePetsInZoo(rangeInputPetsInZoo, rangeLabelPetInZoo, now);
}

btnsSliderPetsInZoo.forEach(button => {
  button.addEventListener('click', onClickSlideBtnPetsInZoo);
});

function onClickRangePetInZoo(evt) {
  isClickOnBtn = false;
  // console.log(isClickOnBtn);
  now = evt.currentTarget.value - 1;
  moveSlidePetInZoo(itemsSliderPetsInZoo, now);
  changeRangeLabePetsInZoo(rangeInputPetsInZoo, rangeLabelPetInZoo);
}

rangeInputPetsInZoo.addEventListener("input", onClickRangePetInZoo);
