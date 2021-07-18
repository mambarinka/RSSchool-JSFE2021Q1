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

export const Words: FunctionComponent<IWordsProps> = (category) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector(apiSelector);

  const handleClickButtonNew = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputText('');
    setValueInputFile({});
  }, []);

  const handleInputText = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputText(inputText.value);
  }, []);

  const handleInputFile = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = evt.currentTarget;
    setValueInputFile(inputFile.files![0]);
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    if (inputFile.files !== null) {
      const file: File = inputFile.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));
      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          if (reader.result !== null) {
            setInitialImageCategory(reader.result as string);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputText('');
    setValueInputFile({});

    const dataForm = new FormData();
    dataForm.append('name', valueInputText);
    dataForm.append('image', valueInputFile as Blob);

    // await fetch('http://localhost:3000/api/Words', {
    // await fetch('https://server-english-for-kids.herokuapp.com/api/Words', {
    //   method: 'POST',
    //   body: dataForm,
    // })
    //   .then((result) => {
    //     console.log('data', dataForm);
    //     console.log('result', result);
    //     console.log('File sent successful');
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // dispatch(getWords());
    // setOpenClassFormUpdate((openClass) => !openClass);
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
            <label htmlFor="category-name">Word name</label>
            <input
              className={styles.textInput}
              type="text"
              name="name"
              id="category-name"
              onChange={(event) => handleInputText(event)}
            />
            <div className={styles.fileWrapper}>
              <label htmlFor="category-image">Word image</label>
              <input
                className={styles.fileInput}
                type="file"
                name="image"
                id="category-image"
                accept="image/png, image/jpeg, image/svg"
                onChange={(event) => handleInputFile(event)}
              />
              <img className={styles.imageCategory} src={initialImageCategory} alt="image word default" />
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
        {arrayCategoryApi.map((item: { text: string; id: string; link: string }) => (
          <WordsItem category={item.text} key={item.id} categoryId={item.id} src={`${baseURL}${item.link}`} />
        ))}
      </ul>
    </main>
  );
};
