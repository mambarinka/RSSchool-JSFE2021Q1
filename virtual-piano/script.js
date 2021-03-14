'use strict';

const piano = document.querySelector('.piano');
const buttonContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('.btn');
const pianoКeys = document.querySelectorAll('.piano-key');

// ПРОИГРЫВАНИЕ НОТ ПРИ КЛИКЕ НА КЛАВИШУ

function playAudio(src) { // функция проигрывания звука на странице
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0; // проигрывание с начала трека
    audio.play();
}

function selectPlayNote(event) { //какая нота будет проигрываться
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
}

function addActiveClass(event) { // функция добавления актвиного класса
    if (event.target.classList.contains('piano-key')) {
        pianoКeys.forEach((el) => {
            if (el.classList.contains('btn-active')) {
                el.classList.remove('btn-active');
            }
        });
        event.target.classList.add('btn-active');
    }
}

function playNotesFinish() {
    selectPlayNote(event);
    addActiveClass(event);
}

piano.addEventListener('click', playNotesFinish);


// ПЕРЕКЛЮЧЕНИЕ NOTES/LETTERS 

function showHide(element, show, hide) {
    element.classList.add(show);
    element.classList.remove(hide);
}

function btnToggle(event) {
    if (event.target.classList.contains('btn-notes')) {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            showHide(element, 'show-before', 'show-after');
            element.classList.remove('hide-before');
        });

        document.querySelector('.btn-letters').classList.remove('btn-active');
    } else {
        event.target.classList.add('btn-active');

        pianoКeys.forEach(element => {
            showHide(element, 'show-after', 'show-before');
            element.classList.add('hide-before');
        });

        document.querySelector('.btn-notes').classList.remove('btn-active');
    }
}

buttonContainer.addEventListener('click', btnToggle);