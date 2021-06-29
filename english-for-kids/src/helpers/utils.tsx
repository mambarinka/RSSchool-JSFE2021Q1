export const playAudio = (src: string) => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  setTimeout(() => {
    audio.play();
  }, 1000);
};

export const shuffleArray = (array: string[]) => array.sort(() => 0.5 - Math.random());
