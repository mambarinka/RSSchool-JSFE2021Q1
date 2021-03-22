'use strict';

const piano = document.querySelector('.piano');
const buttonContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullscreenButton = document.querySelector('.fullscreen');
let key;
let isClickOnKey = false;


function playAudio(src) { // функция проигрывания звука на странице
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0; // проигрывание с начала трека
    audio.play();
}

function addActiveClass(element, adClass) {
    element.classList.add(adClass);
}

function removeActiveСlass(element, adClass) {
    if (!element) {
        return;
    }
    element.classList.remove(adClass);
}

// МЫШЬ 
function onMouseOver(event) {
    key = event.target;
    console.log(key);
    if (key.classList.contains('piano-key')) {
        const note = key.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
        console.log(src);
        addActiveClass(key, 'btn-active');
    }
}

function onMouseOut(event) {
    key = event.target;
    if (key.classList.contains('piano-key')) {
        removeActiveСlass(event.target, 'btn-active');
    }
}

function playNotesMouse(event) {
    onMouseOver(event);
    piano.addEventListener('mouseover', onMouseOver);
    piano.addEventListener('mouseout', onMouseOut);

}

function stopPlayNotesMouse(event) {
    onMouseOut(event);
    piano.removeEventListener('mouseover', onMouseOver);
    piano.removeEventListener('mouseout', onMouseOut);
}

piano.addEventListener('mousedown', playNotesMouse);
document.addEventListener('mouseup', stopPlayNotesMouse);


// КЛАВИАТУРА
function playNotesKeyboard(event) {
    key = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);
    if (!key || event.repeat || event.code === 'AltLeft') {
        return;
    }
    console.log(key);
    const note = key.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    console.log(src);
    playAudio(src);
    addActiveClass(key, 'btn-active');
}

function stopPlayNotesKeyboard(event) {
    key = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);
    removeActiveСlass(key, 'btn-active');
}

document.addEventListener('keydown', playNotesKeyboard);
document.addEventListener('keyup', stopPlayNotesKeyboard);


// ПЕРЕКЛЮЧЕНИЕ NOTES/LETTERS 

function btnToggle(event) {
    if (event.target.classList.contains('btn-notes')) {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            element.classList.remove('letter');
        });

        document.querySelector('.btn-letters').classList.remove('btn-active');
    } else {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            element.classList.add('letter');
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