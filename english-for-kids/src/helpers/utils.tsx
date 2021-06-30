export const playAudio: (path: string | null, card: string | null, success?: boolean | undefined) => void = (
  path: string | null,
  card: string | null,
  success?: boolean
) => {
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
  }, 200);
};

export const shuffleArray: (array: string[]) => string[] = (array: string[]) => array.sort(() => 0.5 - Math.random());
