import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { CardList } from '@/components/CardList';
import { playAudio } from '@/helpers/utils';
import { index } from '@/components/CardList/CardItem/Card-item';
import { PointStarsBlock } from '@/components/PointStarsBlock';
import { Link } from 'react-router-dom';
import styles from './Categories.scss';

export const Categories: () => JSX.Element = () => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);

  const handleClickUpdate = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);
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
    <main className={styles.pageAdminCategories}>
      <h1 className={styles.pageAdminCategoriesTitle}>Categories</h1>
      <ul className={styles.categoriesList}>
        <li className={styles.categoriesItem}>
          <div className={styles.itemWrapper}>
            <h2 className={styles.itemTitle}>Animals</h2>
            <button className={styles.itemCloseButton}></button>
            <div className={styles.textWrapper}>
              <p>WORDS:</p>
              <span className={styles.countWords}>8</span>
            </div>
            <button className={cn(styles.button, styles.buttonUpdate)} onClick={handleClickUpdate}>
              Update
            </button>
            <button className={cn(styles.button, styles.buttonAddWord)}>Add word</button>
          </div>
          <form
            className={cn(styles.formUpdate, openClassFormUpdate ? styles.formUpdateOpen : null)}
            action="/api/categories"
            method="post"
            encType="multipart/form-data"
          >
            <label htmlFor="category-name">Category name</label>
            <input className={styles.textInput} type="text" name="name category" id="category-name" />
            <div className={styles.fileWrapper}>
              <label htmlFor="category-image">Category image</label>
              <input
                className={styles.fileInput}
                type="file"
                name="image category"
                id="category-image"
                accept="image/png, image/jpeg, image/svg"
              />
              <img
                className={styles.imageCategory}
                src={'./images/image-category-default.png.png'}
                alt="image category default"
              />
            </div>
            <div className={styles.buttonFormWrapper}>
              <button className={cn(styles.button, styles.buttonCancel)}>Cancel</button>
              <button className={cn(styles.button, styles.buttonCreate)}>Create</button>
            </div>
          </form>
        </li>
      </ul>
    </main>
  );
};
