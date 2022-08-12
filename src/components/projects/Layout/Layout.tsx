import { Footer } from "components/projects/Footer/Footer";
import { Header } from "components/projects/Header/Header";
import { FC, ReactNode } from "react";

import styles from "./Layout.module.scss";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className="container min-h-4/5">{children}</main>
      <Footer />
    </div>
  );
};
