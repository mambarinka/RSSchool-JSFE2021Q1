export const playAudio: (
  isPlayMode: boolean,
  path: string | null,
  card: string | null,
  success?: boolean | undefined
) => void = (isPlayMode: boolean, path: string | null, card: string | null, success?: boolean) => {
  let delay;
  if (isPlayMode) {
    delay = 1000;
  } else {
    delay = 200;
  }
  const audio = new Audio();
  audio.currentTime = 0;

  if (!path && !card) {
    if (success) {
      audio.src = '../audio/success1.mp3';
    } else {
      audio.src = '../audio/error2.mp3';
    }
  } else {
    audio.src = `../audio/cards/${path}/${card}.mp3`;
  }

  setTimeout(() => {
    audio.play();
  }, delay);
};

export const shuffleArray: (array: string[]) => string[] = (array: string[]) => array.sort(() => 0.5 - Math.random());

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
