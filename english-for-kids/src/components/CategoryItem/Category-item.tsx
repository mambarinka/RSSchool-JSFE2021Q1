import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { appHeaderViewSelector } from "@/App/AppHedaer/AppHeaderView/reducers";
import { useSelector } from "react-redux";
import styles from "./Category-item.scss";

export interface IMenuItemProps {
  category: string;
}

export const CategoryItem: FunctionComponent<IMenuItemProps> = ({
  category,
}) => {
  const { isPlayMode } = useSelector(appHeaderViewSelector);
  return (
    <li
      className={cn(styles.categoryItem, isPlayMode ? styles.playMode : null)}
    >
      <Link to={`/${category}`} className={styles.categoryLink}>
        <img
          src={`../images/categories/${category}.png`}
          alt={`${category} category`}
        />
        <span className={styles.categoryName}></span>
      </Link>
    </li>
  );
};
