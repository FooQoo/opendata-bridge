'use client';

import 'app/globals.scss';

import { Providers } from 'app/provider';
import { Header } from 'components/organisms/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import styles from './ProjectLayout.module.scss';

const ProjectLayout: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SWRConfig>
      <RecoilRoot>
        <Providers>
          <main className={styles.container}>
            <Header />
            <div className={styles.main}>{children}</div>
          </main>
          <Link
            className="relative"
            href={
              'https://github.com/FooQoo/japan-opendata-chatgpt-plugin/blob/main/docs/usage.md'
            }
            target="_blank"
          >
            <div className="fixed bottom-[25px] right-[25px] bg-white rounded-md border-1.5 text-center flex justify-center flex-col items-center p-2 border-gray-300">
              <Image
                src={
                  'https://japan-opendata-chatgpt-plugin.s3.amazonaws.com/logo.png'
                }
                alt="logo"
                width={50}
                height={50}
                className="rounded-md"
              />
              <span className="inline-block">ChatGPT</span>
              <span className="inline-block">で試してみる</span>
            </div>
          </Link>
        </Providers>
      </RecoilRoot>
    </SWRConfig>
  );
};

export default ProjectLayout;
