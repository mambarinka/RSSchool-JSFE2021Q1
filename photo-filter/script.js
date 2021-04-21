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

// ЗАГРУЗКА КАРТИНКИ ПРИ КЛИКЕ НА NEXT
const baseURL = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
const numbersOfPictures = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
];
const hoursToTimeOfDay = {
  morning: {
    start: 6,
    end: 11
  },
  day: {
    start: 12,
    end: 17
  },
  evening: {
    start: 18,
    end: 23
  },
  night: {
    start: 0,
    end: 5
  },
};
let i = 0;

const picture = document.querySelector('img');
const buttonNext = document.querySelector('.btn-next');
let date = new Date();
let currentHour = date.getHours();

let timeOfDay = Object.keys(hoursToTimeOfDay).find((key) => {
  return currentHour >= hoursToTimeOfDay[key].start && currentHour <= hoursToTimeOfDay[key].end;
});

function viewImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    picture.src = `${src}`;
  };
}

function getImage() {
  const index = i % numbersOfPictures.length;
  const imageSrc = `${baseURL}/${timeOfDay}/${numbersOfPictures[index]}.jpg`;
  viewImage(imageSrc);
  i++;
  buttonNext.disabled = true;
  setTimeout(function () {
    buttonNext.disabled = false;
  }, 1000);
}
buttonNext.addEventListener('click', getImage);