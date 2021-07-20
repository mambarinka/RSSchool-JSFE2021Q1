import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
// import { getWords } from '@/api/actions';
import { baseURL } from '@/api/api';
import { apiSelector } from '@/api/reducers';
import { WordsItem } from './WordsItem';
import styles from './Words.scss';

export interface IWordsProps {
  category: string | React.Key | null | undefined;
  // categoryId: string;
  // src: string;
}

export const Words: FunctionComponent<IWordsProps> = ({ category }) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageWord, setInitialImageWord] = useState('./images/image-category-default.png');
  const [initialSoundWord, setInitialSoundWord] = useState('');
  const [valueInputTextName, setValueInputTextName] = useState('');
  const [valueInputTextTranslate, setValueInputTextTranslate] = useState('');
  const [valueInputFileSound, setValueInputFileSound] = useState({});
  const [valueInputFileImage, setValueInputFileImage] = useState({});
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector(apiSelector);

  const handleClickButtonNew = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputTextName('');
    setValueInputTextTranslate('');
    setValueInputFileSound({});
    setValueInputFileImage({});
  }, []);

  const handleInputTextName = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputTextName(inputText.value);
  }, []);

  const handleInputTextTranslate = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputTextTranslate(inputText.value);
  }, []);

  const handleInputSound = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = evt.currentTarget;
    setValueInputFileSound(inputFile.files![0]);
    // const FILE_TYPES = ['aac', '', 'jpeg', 'png'];
    if (inputFile.files !== null) {
      const file: File = inputFile.files[0];
      // const fileName = file.name.toLowerCase();
      // const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));
      // if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result !== null) {
          setInitialSoundWord(reader.result as string);
        }
      });
      reader.readAsDataURL(file);
      // }
    }
  }, []);

  const handleInputImage = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = evt.currentTarget;
    setValueInputFileImage(inputFile.files![0]);
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    if (inputFile.files !== null) {
      const file: File = inputFile.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));
      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          if (reader.result !== null) {
            setInitialImageWord(reader.result as string);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputTextName('');
    setValueInputTextTranslate('');
    setValueInputFileSound({});
    setValueInputFileImage({});

    const dataForm = new FormData();
    dataForm.append('word-name', valueInputTextName);
    dataForm.append('word-translate', valueInputTextTranslate);
    dataForm.append('word-image', valueInputFileSound as Blob);
    dataForm.append('word-image', valueInputFileImage as Blob);

    await fetch('http://localhost:3000/api/Words', {
      // await fetch('https://server-english-for-kids.herokuapp.com/api/Words', {
      method: 'POST',
      body: dataForm,
    })
      .then((result) => {
        console.log('data', dataForm);
        console.log('result', result);
        console.log('File sent successful');
      })
      .catch((e) => {
        console.log(e.message);
      });
    // dispatch(getWords());
  };

  // useEffect(() => {
  //   dispatch(getWords()).then((arr: any) => setArrayCategoryApi(arr.data));
  //   // dispatch(getWords());
  //   // console.log(data);
  //   // setArrayCategoryApi(data);
  // }, [dispatch, getWords, fetch, setOpenClassFormUpdate]);
  return (
    <main className={styles.pageAdminWords}>
      <h1 className={styles.pageAdminWordsTitle}>Words</h1>
      <p className={styles.pageAdminWordsCategory}>
        Category: <span>{category}</span>
      </p>
      <ul className={styles.wordsList}>
        <li className={styles.wordsItem}>
          <h2 className={styles.wordsItemTitle}>Add new word</h2>
          <button className={styles.wordsButtonNew} onClick={handleClickButtonNew}></button>
          <form
            className={cn(styles.formUpdate, openClassFormUpdate ? styles.formUpdateOpen : null)}
            action="/api/Words"
            method="post"
            encType="multipart/form-data"
            onSubmit={(evt) => handleFormSubmit(evt)}
          >
            <label htmlFor="word-name">Word name</label>
            <input
              className={styles.textInput}
              type="text"
              name="word-name"
              id="word-name"
              onChange={(event) => handleInputTextName(event)}
            />
            <label htmlFor="word-translate">Word translate</label>
            <input
              className={styles.textInput}
              type="text"
              name="word-translate"
              id="word-translate"
              onChange={(event) => handleInputTextTranslate(event)}
            />
            <div className={styles.fileWrapper}>
              <label htmlFor="word-sound">Word Sound</label>
              <input
                className={styles.fileInput}
                type="file"
                name="word-sound"
                id="word-sound"
                accept="audio/*,text/html,text/css"
                onChange={(event) => handleInputSound(event)}
              />
            </div>
            <div className={styles.fileWrapper}>
              <label htmlFor="word-image">Word image</label>
              <input
                className={styles.fileInput}
                type="file"
                name="word-image"
                id="word-image"
                accept="image/png, image/jpeg, image/svg"
                onChange={(event) => handleInputImage(event)}
              />
              <img className={styles.imageWord} src={initialImageWord} alt="image word default" />
            </div>
            <div className={styles.buttonFormWrapper}>
              <button className={cn(styles.button, styles.buttonCancel)} onClick={handleClickButtonCancel}>
                Cancel
              </button>
              <button className={cn(styles.button, styles.buttonCreate)} type="submit">
                Create
              </button>
            </div>
          </form>
        </li>
      </ul>
    </main>
  );
};
