import React, { FunctionComponent, useCallback, useState } from 'react';
import cn from 'classnames';
import { deleteWord, updateCategory, updateWord } from '@/api/actions';
import { useDispatch } from 'react-redux';
import { baseURL } from '@/api/api';
import styles from './WordsItem.scss';

export interface IWordsItemProps {
  id: string;
  categoryId: string;
  textRu: string;
  textEn: string;
  linkSound: string;
  linkImage: string;
  category: string | React.Key | null | undefined;
}

export const WordsItem: FunctionComponent<IWordsItemProps> = ({
  id,
  categoryId,
  textRu,
  textEn,
  linkSound,
  linkImage,
  category,
}) => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);

  const [initialImageWord, setInitialImageWord] = useState('./../images/image-category-default.png');
  const [initialSoundWord, setInitialSoundWord] = useState('');

  const [valueInputTextName, setValueInputTextName] = useState('');
  const [valueInputTextTranslate, setValueInputTextTranslate] = useState('');
  const [valueInputFileSound, setValueInputFileSound] = useState({});
  const [valueInputFileImage, setValueInputFileImage] = useState({});
  const dispatch = useDispatch();

  const handleClickChange = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
    setValueInputFileSound(linkSound);
  }, [openClassFormUpdate]);

  const handleClickButtonCancel = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
    // setValueInputTextName('');
    // setValueInputTextTranslate('');
    // setValueInputFileSound({});
    // setValueInputFileImage({});
  }, []);

  const handleClickButtonDelete = useCallback(() => {
    dispatch(deleteWord(JSON.stringify(id)));
  }, [dispatch]);

  const handleInputTextName = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = evt.currentTarget;
      setValueInputTextName(inputText.value);
    },
    [valueInputTextName]
  );

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
          setInitialSoundWord(reader.result as string);
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
    if (
      valueInputTextName === '' ||
      valueInputTextTranslate === '' ||
      valueInputFileSound === {} ||
      valueInputFileImage === {}
    ) {
      alert('Заполните, пожалуйста, все поля');
    } else {
      dataForm.append('id', id);
      dataForm.append('category-id', categoryId);
      dataForm.append('word-name', valueInputTextName);
      dataForm.append('word-translate', valueInputTextTranslate);
      dataForm.append('word-sound', valueInputFileSound as Blob);
      dataForm.append('word-image', valueInputFileImage as Blob);
      dispatch(updateWord(dataForm));
    }
  };

  const handleClickButtonSound = useCallback((evt) => {
    const audio = new Audio();
    audio.currentTime = 0;
    audio.src = linkSound;
    audio.play();
  }, []);

  return (
    <li className={styles.wordsItem}>
      <div className={styles.itemWrapper}>
        <button className={styles.itemCloseButton} onClick={handleClickButtonDelete}></button>
        <div className={styles.textWrapper}>
          <p className={styles.name}>Word:</p>
          <span>{textRu}</span>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.name}>Translate:</p>
          <span>{textEn}</span>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.name}>Sound:</p>
          <button className={styles.buttonSound} onClick={handleClickButtonSound}></button>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.name}>Image:</p>
          <img className={styles.imageCategory} src={linkImage} alt={`${category} category`} />
        </div>
        <div className={styles.buttonCategoryWrapper}>
          <button className={cn(styles.button, styles.buttonUpdate)} onClick={handleClickChange}>
            Change
          </button>
        </div>
      </div>
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
          onChange={(event) => handleInputTextName(event)}
        />
        <label htmlFor="word-translate">Word translate</label>
        <input
          className={styles.textInput}
          type="text"
          name="word-translate"
          onChange={(event) => handleInputTextTranslate(event)}
        />
        <div className={styles.fileWrapper}>
          <label htmlFor="word-sound">Word Sound</label>
          <input
            className={styles.fileInput}
            type="file"
            name="word-sound"
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
            accept="image/png, image/jpeg, image/svg"
            onChange={(event) => handleInputImage(event)}
          />
          <img className={styles.imageWord} src={initialImageWord} alt="image word default" />
        </div>
        <div className={styles.buttonFormWrapper}>
          <button className={cn(styles.button, styles.buttonCancel)} onClick={handleClickButtonCancel} type="button">
            Cancel
          </button>
          <button className={cn(styles.button, styles.buttonCreate)} type="submit">
            Create
          </button>
        </div>
      </form>
    </li>
  );
};
