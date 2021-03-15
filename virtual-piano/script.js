'use strict';

const piano = document.querySelector('.piano');
const buttonContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullscreenButton = document.querySelector('.fullscreen');

let isClick = false; // флаг, показывающий, что произошел клик

// ПРОИГРЫВАНИЕ НОТ ПРИ КЛИКЕ НА КЛАВИШУ

function playAudio(src) { // функция проигрывания звука на странице
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0; // проигрывание с начала трека
    audio.play();
}

function selectPlayNote(event) { //какая нота будет проигрываться
    if (event.target.classList.contains('piano-key')) {
        console.log(event);
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
}

function addActiveClass(event) { // функция добавления актвиного класса
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('btn-active');
    }
}

function playNotesFinish() {
    selectPlayNote(event);
    addActiveClass(event);
}

function removeActiveСlass(event) { // функция удаления актвиного класса
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.remove('btn-active');
    }
}

piano.addEventListener('mousedown', playNotesFinish);
piano.addEventListener('mouseup', removeActiveСlass); //поставить на window???
window.addEventListener('keydown', (event) => {
    if (document.querySelector('.btn-notes').classList.contains('btn-active')) {
        const note = event.key;
        console.log(event);
        console.log(event.key);
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    } else if (document.querySelector('.btn-letters').classList.contains('btn-active')) {
        console.log(event);
        console.log(event.key);
        const div = document.querySelector(`div[data-letter="${event.key}"]`.toUpperCase());
        console.log(div);
        // const note = div.dataset.note;
        // const src = `assets/audio/${note}.mp3`;
        // playAudio(src);
    }
});

window.addEventListener('keyup', removeActiveСlass);


// ПЕРЕКЛЮЧЕНИЕ NOTES/LETTERS 

function btnToggle(event) {
    if (event.target.classList.contains('btn-notes')) {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            element.classList.remove("letter");
        });

        document.querySelector('.btn-letters').classList.remove('btn-active');
    } else {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            element.classList.add("letter");
        });

        document.querySelector('.btn-notes').classList.remove('btn-active');
    }
}

buttonContainer.addEventListener('click', btnToggle);

// ПОЛНОЭКРАННЫЙ РЕЖИМ

function check() { // проверка 
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
        document.exitFullscreen();
    }
}

fullscreenButton.addEventListener('click', toggleScreen);