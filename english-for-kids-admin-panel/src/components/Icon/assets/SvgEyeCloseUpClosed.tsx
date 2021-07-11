import React, { HTMLAttributes, FunctionComponent, SVGAttributes } from 'react';

type Props = HTMLAttributes<SVGElement> | SVGAttributes<SVGElement>;

const SvgEyeCloseUpClosed: FunctionComponent<Props> = (props) => (
  <svg width="18" height="12" viewBox="0 0 18 12" {...props}>
    <g fill="#000" fillRule="nonzero" opacity=".5">
      <path
        fillRule="nonzero"
        d="M8.992.01A9.873 9.873 0 00.036 5.723a.385.385 0 000 .326 9.873 9.873 0 008.956 5.712 9.873 9.873 0 008.955-5.712.385.385 0 000-.326A9.873 9.873 0 008.992.01zm0 9.93a4.053 4.053 0 110-8.106 4.053 4.053 0 010 8.106z"
      />
      <circle cx="8.992" cy="5.885" r="2.595" fillRule="nonzero" />
      <path d="M17.265.01L18 1.297.755 11.761 0 10.51z" />
    </g>
  </svg>
);

export default SvgEyeCloseUpClosed;
