'use strict';

const sliderItems = document.querySelectorAll(`.slider__item`);
const buttonLeft = document.querySelector(`.slider__button--left`);
const buttonRight = document.querySelector(`.slider__button--right`);

let currentPosition = 0;
let sliderArray = Array.from(sliderItems);

function movePosition(position) {
  if (position > 0 || position < -1080) {
    return false;
  }
  currentPosition = position;

  sliderArray.forEach(function (slide) {
    slide.style.transform = `translateX(${position}px`;
    slide.style.transitionDuration = `400ms`;
  });

  return currentPosition;
}

buttonRight.addEventListener(`click`, function () {
  movePosition(currentPosition + 360);
});
buttonLeft.addEventListener(`click`, function () {
  movePosition(currentPosition - 360);
});

buttonRight.removeEventListener(`click`, function () {
  movePosition(currentPosition - 360);
});

buttonLeft.removeEventListener(`click`, function () {
  movePosition(currentPosition + 360);
});
