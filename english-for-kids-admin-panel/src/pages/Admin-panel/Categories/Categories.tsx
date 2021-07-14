import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { CardList } from '@/components/CardList';
import { playAudio } from '@/helpers/utils';
import { index } from '@/components/CardList/CardItem/Card-item';
import { PointStarsBlock } from '@/components/PointStarsBlock';
import { Link } from 'react-router-dom';
import { Input } from '@/components/Input';
import { createCategory } from '@/api/actions';
import { createCategory1 } from '@/api/api';
import { Category } from '@/models/models';
import axios from 'axios';
import styles from './Categories.scss';

export const Categories: () => JSX.Element = () => {
  const [openClassFormUpdate, setOpenClassFormUpdate] = useState(false);
  const [initialImageCategory, setInitialImageCategory] = useState('./images/image-category-default.png');
  const [valueInputText, setValueInputText] = useState('');
  const [valueInputFile, setValueInputFile] = useState('');

  const handleClickUpdate = useCallback(() => {
    setOpenClassFormUpdate((openClass) => !openClass);
  }, [openClassFormUpdate]);

  const handleInputText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = evt.currentTarget;
    setValueInputText(inputText.value);
  };

  let imageFile: string | Blob;
  const handleInputFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = evt.currentTarget;
    imageFile = inputFile!.files![0];
    setValueInputFile(inputFile.value);
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    if (inputFile.files !== null) {
      const file: File = inputFile.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
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
    // const categoryItem: Category = {
    //   name: valueInputText,
    //   image: valueInputFile,
    // };

    // data.append("name", valueInputText);
    // data.append("image", valueInputFile);

    // data.append("name", imageFile);

    data.append(
      'name',
      new Blob(
        [
          JSON.stringify({
            name: valueInputText,
          }),
        ],
        {
          type: 'application/json',
        }
      ),
      valueInputFile
    );

    data.append(
      'image',
      new Blob(
        [
          JSON.stringify({
            image: valueInputFile,
          }),
        ],
        {
          type: 'multipart/form-data; boundary=<calculated when request is sent>',
        }
      ),
      valueInputFile
    );

    // axios
    //   .post("http://localhost:3000/api/categories", data)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      body: data,
    })
      .then((result) => {
        console.log(result);
        console.log('File sent successful');
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  //   try {
  //     const response = await fetch("http://localhost:3000/api/categories", {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await response.json();
  //     console.log("Успех:", JSON.stringify(result));
  //   } catch (error) {
  //     console.error("Ошибка:", error);
  //   }
  // };

  // const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   console.log("11111");
  //   evt.preventDefault();
  //   createCategory1({ name: valueInputText, image: valueInputFile });
  // };

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
      </ul>
    </main>
  );
};
