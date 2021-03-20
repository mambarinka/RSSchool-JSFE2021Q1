'use strict';

const piano = document.querySelector('.piano');
const buttonContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullscreenButton = document.querySelector('.fullscreen');
let key;

// ПРОИГРЫВАНИЕ НОТ ПРИ КЛИКЕ/НАЖАТИИ НА КЛАВИШУ
function playAudio(src) { // функция проигрывания звука на странице
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0; // проигрывание с начала трека
    audio.play();
}

// МЫШЬ 
function selectPlayNoteMouse(event) { //какая нота будет проигрываться
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    console.log(src);
    playAudio(src);
}

function playNotesMouse(event) {
    if (event.target.classList.contains('piano-key')) {
        console.log(event.target);
        selectPlayNoteMouse(event);
        addActiveClassMouse(event);
    }
    pianoКeys.forEach(element => {
        element.addEventListener('mouseover', selectPlayNoteMouse);
        element.addEventListener('mouseover', addActiveClassMouse);
        element.addEventListener('mouseout', removeActiveСlassMouse);
    });
}

function stopPlayNotesMouse(event) {
    pianoКeys.forEach(element => {
        removeActiveСlassMouse(event);
        element.removeEventListener('mouseover', selectPlayNoteMouse);
        element.removeEventListener('mouseover', addActiveClassMouse);
        element.removeEventListener('mouseout', removeActiveСlassMouse);
    });
}

function addActiveClassMouse(event) { // функция добавления актвиного класса
    event.target.classList.add('btn-active');
}

function removeActiveСlassMouse(event) { // функция удаления актвиного класса
    event.target.classList.remove('btn-active');
}

piano.addEventListener('mousedown', playNotesMouse, false);
window.addEventListener('mouseup', stopPlayNotesMouse);

// КЛАВИАТУРА
function selectPlayNoteKeyboard(event) { //какая нота будет проигрываться
    // key = document.querySelector(`.piano-key[data-note="${event.code[3].toLowerCase()}"]`);

    // if (isClickonLetters) {
        key = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);
    // }
    if (!key || event.repeat) {
        return;
    }
    console.log(key);
    let note = key.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    console.log(src);
    playAudio(src);
}

function playNotesKeyboard(event) {
    selectPlayNoteKeyboard(event);
    addActiveClassKeyboard();
}

function addActiveClassKeyboard() { // функция добавления актвиного класса
    if (!key) {
        return;
    }
    key.classList.add('btn-active');
}

function removeActiveСlassKeyboard() { // функция удаления актвиного класса
    if (!key) {
        return;
    }
    key.classList.remove('btn-active');
}

window.addEventListener('keydown', playNotesKeyboard);
window.addEventListener('keyup', removeActiveСlassKeyboard);


// ПЕРЕКЛЮЧЕНИЕ NOTES/LETTERS 
// let isClickonLetters = false;

function btnToggle(event) {
    // isClickonLetters = false;
    if (event.target.classList.contains('btn-notes')) {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            element.classList.remove('letter');
        });

        document.querySelector('.btn-letters').classList.remove('btn-active');
    } else {
        // isClickonLetters = true;
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