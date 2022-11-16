import '../styles/globals.scss';

import { Footer } from 'components/projects/Footer/Footer';
import { Header } from 'components/projects/Header/Header';

import styles from './layout.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
