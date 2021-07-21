import React, { useCallback, useRef, useEffect, FunctionComponent, ReactNode, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './Modal.scss';

export interface IModalProps {
  className?: string;
  children?: ReactNode;
  onOutClick?: () => void;
  overlay?: boolean;
  zIndex?: number;
}

export const Modal: FunctionComponent<IModalProps> = ({
  className = '',
  children,
  onOutClick,
  overlay = true,
  zIndex = 1000,
}: IModalProps) => {
  const [openClassOverlay, setOpenClassOverlay] = useState(true);
  // const onOverlayClick = useCallback(() => {
  //   if (onOutClick) {
  //     onOutClick();
  //   }
  // }, [onOutClick]);

  const container = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  const overlayClickHandler = useCallback(() => {
    setOpenClassOverlay(!openClassOverlay);
  }, [openClassOverlay]);

  const modalStyles = useMemo(() => ({ zIndex }), [zIndex]);
  // const overlayStyles = useMemo(() => ({ zIndex: zIndex - 1 }), [zIndex]);

  const modal = (
    <>
      <div className={cn(styles.modal, className)} style={modalStyles}>
        {children}
      </div>
      <div
        className={cn(styles.overlay, openClassOverlay ? null : styles.overlayOpen)}
        onClick={overlayClickHandler}
      ></div>
    </>
  );

  return ReactDOM.createPortal(modal, container.current);
};
