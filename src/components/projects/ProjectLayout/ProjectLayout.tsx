'use client';

import 'app/globals.scss';

import { Providers } from 'app/provider';
import { Header } from 'components/organisms/Header/Header';
import { Session } from 'next-auth';
import { FunctionComponent, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import styles from './ProjectLayout.module.scss';

const ProjectLayout: FunctionComponent<{
  children: ReactNode;
  session: Session | undefined;
}> = ({ children, session }) => {
  return (
    <SWRConfig>
      <RecoilRoot>
        <Providers>
          <main className={styles.container}>
            <Header session={session} />
            <div className={styles.main}>{children}</div>
          </main>
        </Providers>
      </RecoilRoot>
    </SWRConfig>
  );
};

export default ProjectLayout;
