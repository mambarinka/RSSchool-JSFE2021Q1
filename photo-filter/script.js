'use strict';

const filters = document.querySelector('.filters');
const labels = filters.querySelectorAll('label');
const buttonReset = document.querySelector('.btn-reset');
// const outputs = filters.querySelectorAll('output');
// const inputsFilter = document.querySelectorAll('.filters input');


// ФУНКЦИЯ ДЛЯ СМЕНЫ ЗНАЧЕНИЯ ФИЛЬТРА
function handleUpdate(event) {
  const target = event.target;
  if (target && target.matches('input')) {
    labels.forEach(label => {
      const input = label.querySelector('input');
      const output = label.querySelector('output');
      const suffix = target.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${target.name}`, target.value + suffix);
      output.value = input.value;
    });
  }
}

filters.addEventListener('input', handleUpdate);


// ФУНКЦИЯ ДЛЯ СБРОСА ВСЕХ ФИЛЬТРОВ
function resetFilters() {
  labels.forEach(label => {
    const input = label.querySelector('input');
    const output = label.querySelector('output');
    if (input.name === "saturate") {
      input.value = 100;
      output.value = 100;
    } else {
      input.value = 0;
      output.value = 0;
    }

    document.documentElement.style.removeProperty(`--${input.name}`);
  });
}

buttonReset.addEventListener('click', resetFilters);