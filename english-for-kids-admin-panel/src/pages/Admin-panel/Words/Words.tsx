import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/api/api';
import { apiSelector } from '@/api/reducers';
import { createWord } from '@/api/actions';
import { useHistory } from 'react-router-dom';
import { WordsItem } from './WordsItem';
import styles from './Words.scss';

export interface IWordsProps {
  category: string | React.Key | null | undefined;
  categoryId: string;
}

export const Words: FunctionComponent<IWordsProps> = ({ category, categoryId }) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageWord, setInitialImageWord] = useState('./../images/image-category-default.png');
  const [valueInputTextName, setValueInputTextName] = useState('');
  const [valueInputTextTranslate, setValueInputTextTranslate] = useState('');
  const [valueInputFileSound, setValueInputFileSound] = useState({});
  const [valueInputFileImage, setValueInputFileImage] = useState({});
  const dispatch = useDispatch();
  const { words } = useSelector(apiSelector);
  const [imageCategory, setImageCategory] = useState('');
  const [soundCategory, setSoundCategory] = useState('');

  const [arrayWordsApi, setArrayWordsApi] = useState([] as any[]);
  const numInRow = 4;
  const [amountWordsScroll, setAmountWordsScroll] = useState(numInRow);

  const handleClickButtonNew = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, []);

  const handleClickButtonCancel = useCallback(() => {
    if (openClassFormUpdate) {
      setOpenClassFormUpdate((openClass) => !openClass);
    }
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
    if (inputFile.files !== null) {
      const file: File = inputFile.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result !== null) {
          setSoundCategory(reader.result as string);
        }
      });
      reader.readAsDataURL(file);
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
            setImageCategory(reader.result as string);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setOpenClassFormUpdate((openClass) => !openClass);

    const dataForm = new FormData();
    if (valueInputTextName === '' || valueInputTextTranslate === '' || imageCategory === '' || soundCategory === '') {
      alert('Заполните, пожалуйста, все поля');
    } else {
      dataForm.append('category-id', categoryId);
      dataForm.append('word-name', valueInputTextTranslate);
      dataForm.append('word-translate', valueInputTextName);
      dataForm.append('word-sound', valueInputFileSound as Blob);
      dataForm.append('word-image', valueInputFileImage as Blob);
      dispatch(createWord(dataForm));
    }
  };

  const statusCode = sessionStorage.getItem('status');
  const history = useHistory();
  useEffect(() => {
    if (statusCode !== '200') {
      alert('Вы не авторизованы');
      history.push('main');
    }
  }, [statusCode]);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setAmountWordsScroll((prev) => prev + numInRow);
    }
  };
  const filterArrayOnCategory = words.filter((word) => word.categoryId === categoryId);

  useEffect(() => {
    const loadCategoriesScroll = async () => {
      const newCategories = filterArrayOnCategory.slice(amountWordsScroll - numInRow, amountWordsScroll);

      setArrayWordsApi((prev) => [...prev, ...newCategories]);
    };

    loadCategoriesScroll();
  }, [amountWordsScroll]);

  return (
    <main className={styles.pageAdminWords}>
      <h1 className={styles.pageAdminWordsTitle}>Words</h1>
      <p className={styles.pageAdminWordsCategory}>
        Category: <span>{category}</span>
      </p>
      <ul className={styles.wordsList} onScroll={handleScroll}>
        {arrayWordsApi &&
          arrayWordsApi.map(
            (item: {
              id: string;
              categoryId: string;
              textRu: string;
              textEn: string;
              linkSound: string;
              linkImage: string;
            }) => (
              <WordsItem
                id={item.id}
                categoryId={item.categoryId}
                key={item.id}
                textRu={item.textRu}
                textEn={item.textEn}
                linkSound={`${baseURL}${item.linkSound}`}
                linkImage={`${baseURL}${item.linkImage}`}
                category={category}
              />
            )
          )}
        <li className={cn(amountWordsScroll >= filterArrayOnCategory.length ? styles.wordsItem : styles.hide)}>
          <h2 className={styles.wordsItemTitle}>Add new word</h2>
          <button className={styles.wordsButtonNew} onClick={handleClickButtonNew}></button>
          <form
            className={cn(styles.formUpdate, openClassFormUpdate ? styles.formUpdateOpen : null)}
            action="/api/words"
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
              value={valueInputTextName}
            />
            <label htmlFor="word-translate">Word translate</label>
            <input
              className={styles.textInput}
              type="text"
              name="word-translate"
              id="word-translate"
              onChange={(event) => handleInputTextTranslate(event)}
              value={valueInputTextTranslate}
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
              <button
                className={cn(styles.button, styles.buttonCancel)}
                onClick={handleClickButtonCancel}
                type="button"
              >
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
