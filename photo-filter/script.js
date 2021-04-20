'use strict';

const filters = document.querySelector('.filters');
const inputsFilter = document.querySelectorAll('.filters input');

function handleUpdate(event) {
  const target = event.target;
  if (target && target.matches('input')) {
    const suffix = target.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${target.name}`, target.value + suffix);
  }
}

filters.addEventListener('input', handleUpdate);