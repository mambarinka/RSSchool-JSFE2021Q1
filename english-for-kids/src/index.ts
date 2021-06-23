import './style.scss';

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector('.toggle');
  const switchButton = document.querySelector('.switch');
console.log(switchButton);

  toggle!.addEventListener('click', () => {
    document.querySelector('.page-header')?.classList.toggle('open-nav');
    toggle?.classList.toggle('toggle--open');
  });

  switchButton?.addEventListener('click', () => {
    console.log('sgrgs');
    document.body.classList.toggle('play-mode');
  })
});

