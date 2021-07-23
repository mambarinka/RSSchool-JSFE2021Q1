import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories, getWords } from '@/api/actions';
import { baseURL } from '@/api/api';
import { apiSelector } from '@/api/reducers';
import { useHistory } from 'react-router-dom';
import { CategoriesItem } from './CaregoriesItem';
import styles from './Categories.scss';

export interface ICategoriesAdminProps {
  active: boolean;
  setActive?: any;
}

export const Categories: FunctionComponent<ICategoriesAdminProps> = () => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});
  const dispatch = useDispatch();
  const { categories } = useSelector(apiSelector);
  const [imageCategory, setImageCategory] = useState('');

  const [arrayCategoryApi, setArrayCategoryApi] = useState([] as any[]);
  const numInRow = 4;
  const [amountCategoriesScroll, setAmountCategoriesScroll] = useState(numInRow);

  const handleClickButtonNew = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, []);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
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

    if (valueInputText === '' || imageCategory === '') {
      alert('Заполните, пожалуйста, все поля');
    } else {
      const dataForm = new FormData();
      dataForm.append('name', valueInputText);
      dataForm.append('image', valueInputFile as Blob);

      dispatch(createCategory(dataForm));
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWords());
  }, [dispatch]);

  // useEffect(() => {
  //   setArrayCategoryApi(categories);
  // }, [categories]);

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
      setAmountCategoriesScroll((prev) => prev + numInRow);
    }
  };

  useEffect(() => {
    const loadCategoriesScroll = async () => {
      const newCategories = categories.slice(amountCategoriesScroll - numInRow, amountCategoriesScroll);

      setArrayCategoryApi((prev) => [...prev, ...newCategories]);
    };

    loadCategoriesScroll();
  }, [amountCategoriesScroll]);

  return (
    <main className={styles.pageAdminCategories}>
      <h1 className={styles.pageAdminCategoriesTitle}>Categories</h1>
      <ul className={styles.categoriesList} onScroll={handleScroll}>
        {arrayCategoryApi &&
          arrayCategoryApi.map((item: { text: string; id: string; link: string }) => (
            <CategoriesItem category={item.text} key={item.id} categoryId={item.id} src={`${baseURL}${item.link}`} />
          ))}
        <li className={cn(amountCategoriesScroll >= categories.length ? styles.categoriesItem : styles.hide)}>
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
              <button
                className={cn(styles.button, styles.buttonCancel)}
                type="button"
                onClick={handleClickButtonCancel}
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
