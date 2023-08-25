import 'app/globals.scss';

import { Providers } from 'app/provider';
import { Footer } from 'components/organisms/Footer/Footer';
import { Header } from 'components/organisms/Header/Header';
import { FC, ReactNode } from 'react';

import styles from './layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <Providers>
          <div className={styles.container}>
            <Header />
            <main className="container min-h-4/5">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
