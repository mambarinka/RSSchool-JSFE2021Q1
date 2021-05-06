'use strict';

// БУРГЕР
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navToggle.classList.add('menu-opened');
    navToggle.classList.remove('menu-closed');
  } else {
    navMain.classList.add('main-nav--closed');
    navToggle.classList.remove('menu-opened');
    navToggle.classList.add('menu-closed');
  }
});

// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
const switchBtn = document.querySelector('.switch__slider');
const body = document.querySelector('body');
const logo = body.querySelector('.logo__image');

if (!localStorage.theme) {
  localStorage.theme = document.body.className || 'light-theme';
  localStorage.logo = logo.src || '../../assets/images/logo-online-zoo.svg';
}

document.body.className = localStorage.theme;
logo.src = localStorage.logo;

function changeTheme() {
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    logo.src = "../../assets/images/logo-online-zoo-footer.svg";
    localStorage.theme = document.body.className || 'dark-theme';
    localStorage.logo = logo.src || '../../assets/images/logo-online-zoo-footer.svg';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    logo.src = "../../assets/images/logo-online-zoo.svg";
    localStorage.theme = document.body.className || 'light-theme';
    localStorage.logo = logo.src || '../../assets/images/logo-online-zoo.svg';
  }
}

switchBtn.addEventListener('click', changeTheme);

// ЗАМЕНА ВИДЕО
const videoPlaylist = document.querySelector('.zoo-video__playlist');
const mainVideo = document.querySelector('.zoo-video__main-iframe');
const videoItems = videoPlaylist.querySelectorAll('.zoo-video__item');
const videoItemsIframes = videoPlaylist.querySelectorAll('.zoo-video__iframe');
let video;
let linkVideo;
let linkMainVideo = mainVideo.src;

function switchVideo(evt) {
  linkMainVideo = mainVideo.src;
  mainVideo.src = evt.target.children[0].attributes[3].value;
  evt.target.children[0].attributes[3].value = linkMainVideo;
}

videoItems.forEach(video => {
  video.addEventListener('click', switchVideo);
});

// ПРИВЯЗКА ТОЧЕК К СЛАЙДЕРУ
const dotsBtnsContainer = document.querySelector('.zoo-video__pagination');
const dotsBtns = document.querySelectorAll('.pagination-list__button');

function onClickDotBtn(evt) {
  if (evt.target.classList.contains('pagination-list__button')) {
    dotsBtns.forEach(dot => {
      dot.classList.remove('pagination-list__button--active');
    });

    let move = -videoPlaylist.getBoundingClientRect().width * evt.target.dataset.index;
    videoItems.forEach(video => {
      video.style.transitionDuration = `1000ms`;
      video.style.transform = `translateX(${move}px)`;
    });

    evt.target.classList.add('pagination-list__button--active');
  }
}

dotsBtnsContainer.addEventListener('click', onClickDotBtn);
