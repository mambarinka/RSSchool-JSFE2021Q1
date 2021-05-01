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
  localStorage.theme = 'light-theme';
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
