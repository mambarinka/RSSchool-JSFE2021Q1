import React, { FunctionComponent } from "react";
import cn from "classnames";

import { useSelector } from "react-redux";
import { Category, mainSelector } from "@/pages/Main/reducer";
import styles from "./Menu.scss";
import { MenuItem } from "./Menu-item";

export interface IMenuProps {
  isInitialState: boolean;
}

export const Menu: FunctionComponent<IMenuProps> = ({ isInitialState }) => {
  const { categories } = useSelector(mainSelector);
  return (
    <ul className={cn(styles.menu, isInitialState ? null : styles.open)}>
      <MenuItem mod={"main"} />
      {categories.map((category: Category) => (
        <MenuItem mod={category.value} key={category.value} />
      ))}
    </ul>
  );
};
