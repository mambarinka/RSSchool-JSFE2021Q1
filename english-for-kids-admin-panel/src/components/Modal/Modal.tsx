import React, { useCallback, useRef, useEffect, FunctionComponent, ReactNode, useMemo } from 'react';
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
  const onOverlayClick = useCallback(() => {
    if (onOutClick) {
      onOutClick();
    }
  }, [onOutClick]);

  const container = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  const modalStyles = useMemo(() => ({ zIndex }), [zIndex]);
  const overlayStyles = useMemo(() => ({ zIndex: zIndex - 1 }), [zIndex]);

  const modal = (
    <>
      <div className={cn(styles.modal, className)} style={modalStyles}>
        {children}
      </div>
      {overlay && <div className={styles.overlay} style={overlayStyles} onClick={onOverlayClick} />}
    </>
  );

  return ReactDOM.createPortal(modal, container.current);
};
