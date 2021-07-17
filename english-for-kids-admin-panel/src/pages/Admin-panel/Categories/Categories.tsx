import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { getCategories } from '@/api/actions';
import styles from './Categories.scss';
import { CategoriesItem } from './CaregoriesItem';

export const Categories: () => JSX.Element = () => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});
  const [arrayCategoryApi, setArrayCategoryApi] = useState([]);
  const dispatch = useDispatch();

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
    const data = new FormData();
    data.append('name', valueInputText);
    data.append('image', valueInputFile as Blob);

    await fetch('https://server-english-for-kids.herokuapp.com/api/categories', {
      method: 'POST',
      body: data,
    })
      .then((result) => {
        console.log('data', data);
        console.log('result', result);
        console.log('File sent successful');
      })
      .catch((e) => {
        console.log(e.message);
      });
    dispatch(getCategories());
    setOpenClassFormUpdate((openClass) => !openClass);
  };

  useEffect(() => {
    dispatch(getCategories()).then((arr: any) => setArrayCategoryApi(arr.data));
  }, [dispatch]);

  return (
    <main className={styles.pageAdminCategories}>
      <h1 className={styles.pageAdminCategoriesTitle}>Categories</h1>
      <ul className={styles.categoriesList}>
        <li className={styles.categoriesItem}>
          <h2 className={styles.categoriesItemTitle}>Create new Category</h2>
          <button className={styles.categoriesButtonNew} onClick={handleClickButtonNew}></button>
          <form
            className={cn(styles.formUpdate, openClassFormUpdate ? styles.formUpdateOpen : null)}
            action="/api/categories"
            method="post"
            encType="multipart/form-data"
            onSubmit={(evt) => handleFormSubmit(evt)}
          >
            <label htmlFor="category-name">Category name</label>
            <input
              className={styles.textInput}
              type="text"
              name="name"
              id="category-name"
              onChange={(event) => handleInputText(event)}
            />
            <div className={styles.fileWrapper}>
              <label htmlFor="category-image">Category image</label>
              <input
                className={styles.fileInput}
                type="file"
                name="image"
                id="category-image"
                accept="image/png, image/jpeg, image/svg"
                onChange={(event) => handleInputFile(event)}
              />
              <img className={styles.imageCategory} src={initialImageCategory} alt="image category default" />
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
        {arrayCategoryApi.map((item: { text: React.Key | null | undefined; id: string }) => (
          <CategoriesItem category={item.text} key={item.id} />
        ))}
      </ul>
    </main>
  );
};
