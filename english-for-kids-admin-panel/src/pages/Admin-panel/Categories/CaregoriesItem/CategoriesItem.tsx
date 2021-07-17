import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';
import styles from './CategoriesItem.scss';

export interface ICategoriesItemProps {
  category: string | React.Key | null | undefined;
  // src: string;
}

export const CategoriesItem: FunctionComponent<ICategoriesItemProps> = ({ category }) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});

  const handleClickUpdate = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleInputText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputText(inputText.value);
  };
  const handleInputFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData();
    data.append('name', valueInputText);
    data.append('image', valueInputFile as Blob);

    await fetch('https://server-english-for-kids.herokuapp.com/', {
      method: 'POST',
      body: data,
    })
      .then((result) => {
        console.log('result', result);
        console.log('File sent successful');
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <li className={styles.categoriesItem}>
      <div className={styles.itemWrapper}>
        <h2 className={styles.itemTitle}>{category}</h2>
        <button className={styles.itemCloseButton}></button>
        <div className={styles.textWrapper}>
          <p>WORDS:</p>
          <span className={styles.countWords}></span>
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
          <button className={cn(styles.button, styles.buttonCancel)}>Cancel</button>
          <button className={cn(styles.button, styles.buttonCreate)} type="submit">
            Create
          </button>
        </div>
      </form>
    </li>
  );
};
