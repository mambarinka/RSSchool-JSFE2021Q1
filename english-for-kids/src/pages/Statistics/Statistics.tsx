import React from 'react';

import { useSelector } from 'react-redux';
import { mainSelector } from '../Main/reducer';

export const Statistics: () => JSX.Element = () => {
  const { categories } = useSelector(mainSelector);
  return (
    <>
      <div></div>
    </>
  );
};
