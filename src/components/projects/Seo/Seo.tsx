import Head from "next/head";
import { totalmem } from "os";
import { FC, ReactNode } from "react";

export type HeadProps = {
  title: string;
  description: string;
  icon: string;
};

export const Seo: FC<HeadProps> = ({ title, description, icon }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={icon} />
    </Head>
  );
};
