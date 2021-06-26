import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.toggle');
  const switchButton = document.querySelector('.switch');
  const navigation = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  toggle!.addEventListener('click', () => {
    document.querySelector('.page-header')?.classList.toggle('open-nav');
    // toggle?.classList.toggle('toggle--open');
    // navigation?.classList.toggle('menu--open');
    // overlay?.classList.toggle('overlay--open');
  });

  switchButton?.addEventListener('click', () => {
    document.body.classList.toggle('play-mode');
  });

  overlay?.addEventListener('click', () => {
    // toggle?.classList.toggle('toggle--open');
    // navigation?.classList.toggle('menu--open');
    // overlay?.classList.toggle('overlay--open');
  });
});
