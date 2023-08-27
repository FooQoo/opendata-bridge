'use client';

import 'app/globals.scss';

import { Providers } from 'app/provider';
import { Header } from 'components/organisms/Header/Header';
import { FC, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import styles from './ProjectLayout.module.scss';

const ProjectLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SWRConfig>
      <RecoilRoot>
        <Providers>
          <main className={styles.container}>
            <Header />
            <div className={styles.main}>{children}</div>
          </main>
        </Providers>
      </RecoilRoot>
    </SWRConfig>
  );
};

export default ProjectLayout;
