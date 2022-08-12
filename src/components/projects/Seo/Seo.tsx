import Head from 'next/head';
import { FC } from 'react';

export type SeoProps = {
  title: string;
  description: string;
  icon: string;
};

export const Seo: FC<SeoProps> = ({ title, description, icon }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={icon} />
    </Head>
  );
};
