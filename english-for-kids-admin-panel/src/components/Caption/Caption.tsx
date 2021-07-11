import React, { FunctionComponent, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Caption.scss';

interface ICaptionProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

export const Caption: FunctionComponent<ICaptionProps> = ({ className = '', children }) => {
  const captionClassName = cn(styles.caption, className);
  return <div className={captionClassName}>{children}</div>;
};
