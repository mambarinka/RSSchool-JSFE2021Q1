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
      drawImage();
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
    drawImage();
  });
  // drawImage();
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
  img.addEventListener(`load`, () => {
    picture.src = `${src}`;
    drawImage();
  });
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
  // drawImage();
}
buttonNext.addEventListener('click', getImage);

// ЗАГРУЗКА КАРТИНКИ С КОМПЬЮТЕРА
const buttonLoad = document.querySelector('.btn-load');
const fileInput = document.querySelector('input[type="file"]');

function loadPicture() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener(`load`, () => {
    picture.src = reader.result;
    // reader.readAsDataURL(file);
    fileInput.value = "";
    drawImage();
  });
}
buttonLoad.addEventListener(`change`, loadPicture);

// СОХРАНЕНИЕ КАРТИНКИ НА PC 
const canvas = document.createElement('canvas');
const buttonSave = document.querySelector('.btn-save');

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = picture.src;
  img.addEventListener(`load`, () => {
    canvas.width = picture.naturalWidth;
    canvas.height = picture.naturalHeight;
    const ctx = canvas.getContext("2d");

    // коэффициент для правильного расчет blur (канвас применяет blur к ориг.размеру картинки, а фильтры приложения наоборот)
    let ratio;
    if (img.width > img.height) {
      ratio = img.width / picture.width;
    } else {
      ratio = img.height / picture.height;
    }
    const blur = filters.querySelector('input[name=blur]');
    ctx.filter = window.getComputedStyle(picture).getPropertyValue('filter') + `blur(${blur.value*ratio}px)`;
    ctx.drawImage(img, 0, 0);
    console.log(img);
  });
}
drawImage();

function savePicture() {
  const dataURL = canvas.toDataURL("image/png");
  let link = document.createElement('a');
  link.download = 'image.png';
  link.href = dataURL;
  link.click();
  link.delete;
}
buttonSave.addEventListener('click', savePicture);


// ПОЛНОЭКРАННЫЙ РЕЖИМ
const fullscreenButton = document.querySelector('.fullscreen');

function check() {
  console.log(document.fullscreenEnabled); // доступен ли полноэкранный режим 
  console.dir(document.fullscreenElement);
  // возвращает эл-т, который в данный мом-т предст. в этом док. в полн. режиме
}
fullscreenButton.addEventListener('click', check);

function toggleScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen(); // возвращает корневой элемент страницы (html) 
    // и запросить полноэкранный режим
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
fullscreenButton.addEventListener('click', toggleScreen);