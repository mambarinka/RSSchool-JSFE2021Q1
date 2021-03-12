'use strict';

const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');


// События мыши
// piano.addEventListener('click', playAudio);
// piano.addEventListener('click', (event) => playAudio(event));


// События клавиатуры
// window.addEventListener('keydown', (event) => playAudio(event));

// window.addEventListener('keydown', (event) => {
//     if(event.code === 'Space') {
//       playAudio();
//     }
//   });


// Проигрывание звука на странице
// const audio = document.querySelector('audio');
// const buttonExmpl = document.querySelector('.example-button');

// function playAudio(event) {
//     audio.currentTime = 0;
//     audio.play();
// }

// buttonExmpl.addEventListener('click', (event) => playAudio(event));

// Рефакторинг функции playAudio
const button = document.querySelector('button');
const url = 'https://zvukipro.com/uploads/files/2017-09/1504526458_zvuki-prirody-penie-solovya.mp3';

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

button.addEventListener('click', () => playAudio(url));


// делегирование 
// piano.addEventListener('click', (event) => {
//     if (event.target.classList.contains('piano-key')) {
//         playAudio(url);
//     }
// });

// data-атрибуты

piano.addEventListener('click', (event) => {

    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);

        pianoКeys.forEach((el) => {
            if (el.classList.contains('btn-active')) {
                el.classList.remove('btn-active');
            }
        });
        event.target.classList.add('btn-active');
    }
});