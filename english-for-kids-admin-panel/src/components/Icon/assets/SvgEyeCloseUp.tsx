import React, { HTMLAttributes, FunctionComponent, SVGAttributes } from 'react';

type Props = HTMLAttributes<SVGElement> | SVGAttributes<SVGElement>;

const SvgEyeCloseUp: FunctionComponent<Props> = (props) => (
  <svg width="18" height="12" viewBox="0 0 18 12" {...props}>
    <g fill="#000" fillRule="nonzero" opacity=".5">
      <path d="M8.992.01A9.873 9.873 0 0 0 .036 5.723a.385.385 0 0 0 0 .326 9.873 9.873 0 0 0 8.956 5.712 9.873 9.873 0 0 0 8.955-5.712.385.385 0 0 0 0-.326A9.873 9.873 0 0 0 8.992.01zm0 9.93a4.053 4.053 0 1 1 0-8.106 4.053 4.053 0 0 1 0 8.106z" />
      <circle cx="8.992" cy="5.885" r="2.595" />
    </g>
  </svg>
);

export default SvgEyeCloseUp;
