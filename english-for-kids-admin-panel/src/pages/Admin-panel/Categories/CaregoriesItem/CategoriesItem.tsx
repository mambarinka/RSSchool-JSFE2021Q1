import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { deleteCategory, updateCategory } from '@/api/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiSelector } from '@/api/reducers';
import styles from './CategoriesItem.scss';

export interface ICategoriesItemProps {
  category: string | React.Key | null | undefined;
  categoryId: string;
  src: string;
}

export const CategoriesItem: FunctionComponent<ICategoriesItemProps> = ({ category, categoryId, src }) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});
  const [imageCategory, setImageCategory] = useState(src);

  const dispatch = useDispatch();
  const { words } = useSelector(apiSelector);

  const handleClickUpdate = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, []);

  const handleClickButtonDelete = useCallback(() => {
    dispatch(deleteCategory(JSON.stringify(categoryId)));
  }, [dispatch]);

  const countWordsinCategory = words.filter((obj: { categoryId: string }) => obj.categoryId === categoryId).length;

  const handleInputText = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputText(inputText.value);
  }, []);

  const handleInputFile = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = evt.currentTarget;
    setValueInputFile(evt.currentTarget.files![0]);

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

  useEffect(() => {
    setImageCategory(src);
  }, [src]);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setOpenClassFormUpdate((openClass) => !openClass);

    const data = new FormData();

    if (valueInputText === '' || imageCategory === '') {
      alert('Заполните, пожалуйста, все поля');
    } else {
      data.append('name', valueInputText);
      data.append('image', valueInputFile as Blob);
      data.append('id', categoryId);
      dispatch(updateCategory(data));
    }
  };
  return (
    <li className={styles.categoriesItem}>
      <div className={styles.itemWrapper}>
        <h2 className={styles.itemTitle}>{category}</h2>
        <button className={styles.itemCloseButton} onClick={handleClickButtonDelete}></button>
        <div className={styles.textWrapper}>
          <p>WORDS:</p>
          <span className={styles.countWords}>{countWordsinCategory}</span>
        </div>
        <img className={styles.imageCategory} src={imageCategory} alt={`${category} category`} />
        <div className={styles.buttonCategoryWrapper}>
          <button className={cn(styles.button, styles.buttonUpdate)} onClick={handleClickUpdate}>
            Update
          </button>
          <Link to={`/${category}-category/words`} className={cn(styles.button, styles.buttonAddWord)}>
            Add word
          </Link>
        </div>
      </div>
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
          onChange={(event) => {
            handleInputText(event);
            setValueInputText(event.target.value);
          }}
        />
        <div className={styles.fileWrapper}>
          <label htmlFor="category-image">Category image</label>
          <input
            className={styles.fileInput}
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/svg"
            onChange={(event) => handleInputFile(event)}
          />
          <img className={styles.imageCategory} src={initialImageCategory} alt="image category default" />
        </div>
        <div className={styles.buttonFormWrapper}>
          <button className={cn(styles.button, styles.buttonCancel)} type="button" onClick={handleClickButtonCancel}>
            Cancel
          </button>
          <button className={cn(styles.button, styles.buttonCreate)} type="submit">
            Save
          </button>
        </div>
      </form>
    </li>
  );
};
