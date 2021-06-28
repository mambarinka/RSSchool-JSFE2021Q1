declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;
  export = classNames;
}

// declare module 'react'
declare module 'react-redux';
declare module 'react-router-dom';
declare module 'react-dom';
declare module 'redux-reducer-actions';
declare let event: Event | undefined;
