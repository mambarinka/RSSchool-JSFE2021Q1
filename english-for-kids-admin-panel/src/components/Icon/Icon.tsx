import React, { FunctionComponent } from 'react';

import EyeCloseUp from './assets/SvgEyeCloseUp';
import EyeCloseUpClosed from './assets/SvgEyeCloseUpClosed';

export const iconsMap = {
  EyeCloseUp,
  EyeCloseUpClosed,
};

interface IIconProps {
  type: keyof typeof iconsMap;
  className?: string;
  color?: string;
  onClick?: () => void;
  transform?: string;
}

export const Icon: FunctionComponent<IIconProps> = ({ type, className = '', color = 'inherit', ...otherProps }) => {
  const Component = iconsMap[type];
  return <Component className={className} color={color} {...otherProps} />;
};
