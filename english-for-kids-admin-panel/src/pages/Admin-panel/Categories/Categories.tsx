import React from 'react';
import cn from 'classnames';
import { CardList } from '@/components/CardList';
import { playAudio } from '@/helpers/utils';
import { index } from '@/components/CardList/CardItem/Card-item';
import { PointStarsBlock } from '@/components/PointStarsBlock';
import styles from './Categories.scss';

export const Categories: () => JSX.Element = () => {
  // const dispatch = useDispatch();
  // const { categories } = useSelector(mainSelector);
  // const arrayCategory: Category[] = Object.values(categories);
  // const path = window.location.pathname.slice(1);
  // const result = arrayCategory.filter((categoryItem) => categoryItem.value === `${path}`);
  // const shuffleArray = result[0].shuffleCards;
  // const { arrayStars } = useSelector(mainSelector);
  // const history = useHistory();

  // const { isPlayMode } = useSelector(appHeaderViewSelector);
  // const [openClassButtonStart, setOpenClassButtonStart] = useState(false);
  // const [openClassOverlay, setOpenClassOverlay] = useState(true);
  // const [openClassPointStarsBlock, setOpenClassPointStarsBlock] = useState(true);
  // const [isWin, setIsWin] = useState(false);
  // const audio = new Audio();
  // audio.currentTime = 0;

  // useEffect(() => {
  //   if (openClassButtonStart) {
  //     setOpenClassButtonStart((openClass) => !openClass);
  //     setOpenClassOverlay((openClass) => !openClass);
  //   }
  // }, [isPlayMode, path]);

  // useEffect(() => {
  //   dispatch(clearArrayStars());
  // }, [dispatch, clearArrayStars]);

  // const arrayFilterStars = arrayStars.filter((item) => item === true);
  // const errors = arrayStars.filter((item) => item === false).length;

  // useEffect(() => {
  //   if (arrayFilterStars.length === 8) {
  //     if (errors === 0) {
  //       setIsWin(!isWin);
  //       audio.src = '../audio/win.mp3';
  //     } else {
  //       setIsWin(isWin);
  //       audio.src = '../audio/lose.mp3';
  //     }
  //     audio.play();
  //     setTimeout(() => {
  //       dispatch(clearArrayStars());
  //       history.push('main');
  //     }, 4000);
  //   }
  // }, [arrayStars]);

  // const ButtonStartHandler = useCallback(() => {
  //   setOpenClassOverlay((openClass) => !openClass);
  //   setOpenClassButtonStart((openClass) => !openClass);
  //   setOpenClassPointStarsBlock((openClass) => !openClass);
  //   playAudio(true, path, shuffleArray[0]);
  // }, [openClassOverlay]);

  return (
    <main>
      <h1>Categories</h1>
      <ul>
        <li>
          <h2></h2>
          <button></button>
          <p></p>
          <span></span>
          <button></button>
          <button></button>
        </li>
      </ul>
    </main>
  );
};
