import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';
import { updateCategory } from '@/api/actions';
import { useDispatch } from 'react-redux';
import styles from './WordsItem.scss';

export interface IWordsItemProps {
  category: string | React.Key | null | undefined;
  categoryId: string;
  src: string;
}

export const WordsItem: FunctionComponent<IWordsItemProps> = ({ category, categoryId, src }) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState({});
  const dispatch = useDispatch();

  const handleClickUpdate = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputText('');
    setValueInputFile({});
  }, []);

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
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputText('');
    setValueInputFile({});

    const data = new FormData();
    if (valueInputText === '' || valueInputFile === {}) {
      alert('Заполните, пожалуйста, все поля');
    } else {
      data.append('name', valueInputText);
      data.append('image', valueInputFile as Blob);
      data.append('id', categoryId);

      dispatch(updateCategory(data));
    }
    // await fetch('https://server-english-for-kids.herokuapp.com/', {
    //   method: 'POST',
    //   body: data,
    // })
    //   .then((result) => {
    //     console.log('result', result);
    //     console.log('File sent successful');
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
  };

  return (
    <li className={styles.wordsItem}>
      <div className={styles.itemWrapper}>
        <h2 className={styles.itemTitle}>{category}</h2>
        <button className={styles.itemCloseButton}></button>
        <div className={styles.textWrapper}>
          <p>WORDS:</p>
          <span className={styles.countWords}></span>
        </div>
        <img className={styles.imageCategory} src={src} alt={`${category} category`} />
        <div className={styles.buttonCategoryWrapper}>
          <button className={cn(styles.button, styles.buttonUpdate)} onClick={handleClickUpdate}>
            Update
          </button>
          <button className={cn(styles.button, styles.buttonAddWord)}>Add word</button>
        </div>
      </div>
      <form
        className={cn(styles.formUpdate, openClassFormUpdate ? styles.formUpdateOpen : null)}
        action="/api/Words"
        method="post"
        encType="multipart/form-data"
        onSubmit={(evt) => handleFormSubmit(evt)}
      >
        <label htmlFor="category-name">Category name</label>
        <input className={styles.textInput} type="text" name="name" onChange={(event) => handleInputText(event)} />
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
