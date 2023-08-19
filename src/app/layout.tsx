import '../styles/globals.scss';

import { Footer } from 'components/organisms/Footer/Footer';
import { Header } from 'components/organisms/Header/Header';
import { FC, ReactNode } from 'react';

import styles from './layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <div className={styles.container}>
          <Header />
          <main className="container min-h-4/5">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;
