'use strict';

const sliderItems = document.querySelectorAll(`.slider__item`);
const buttonLeft = document.querySelector(`.slider__button--left`);
const buttonRight = document.querySelector(`.slider__button--right`);

let sliderArray = Array.from(sliderItems);
let numberSlides = sliderItems.length;
console.log(numberSlides);
let now = 0;
let array = [];

for (let i = 0; i < numberSlides; i++) {
  array.push(`-${i*360}px`); // массив с вариантами смещения слайдера для каждой картинки
}
console.log(array);

buttonRight.addEventListener(`click`, function () {
  --now; // уменьшаем индекс картинки
  console.log(now);
  if (now < -(numberSlides - 3)) { // если залезли в отрицательную область, делаем текущей последнюю картинку
    now = 0;
  }

  sliderArray.forEach(function (slide) {
    slide.style.transform = `translateX(${array[-now]})`;
    slide.style.transitionDuration = `400ms`;
  });
});

buttonLeft.addEventListener(`click`, function () {
  ++now; // увеличиваем индекс картинки

  if (now > numberSlides - 3) {
    now = 0; // если индекс больше, чем может быть, делаем текущей первую картинку
  }

  sliderArray.forEach(function (slide) {
    slide.style.transform = `translateX(${array[now]})`;
    slide.style.transitionDuration = `400ms`;
  });
});

