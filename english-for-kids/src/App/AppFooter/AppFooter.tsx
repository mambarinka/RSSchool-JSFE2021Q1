import React from 'react';
import cn from 'classnames';
import styles from './AppFooter.scss';

export const AppFooter: () => JSX.Element = () => (
  <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
      <a
        className={cn(styles.footerLink, styles.footerLinkGithub)}
        href="https://github.com/mambarinka"
        target="_blank"
      >
        mambarinka
      </a>
      <a className={cn(styles.footerLink, styles.footerLinkRsschool)} href="https://rs.school/js/" target="_blank">
        <span className={styles.footerLinkYear}>'21</span>
      </a>
    </div>
  </footer>
);
