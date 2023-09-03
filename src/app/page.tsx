import PromptTemplateList from 'app/PromptTemplateList';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import { Footer } from 'components/organisms/Footer/Footer';
import usecaseSearchFeatcher from 'lib/axios/usecaseSearchFetcher';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Home.module.scss';

const Home = async () => {
  // If you use ssg, you can use the following code.

  const usercassList = await usecaseSearchFeatcher('');

  return (
    <div className="w-full md:w-[80%] mx-0 md:mx-[400px] h-screen">
      <div className={styles.hero}>
        <div className={styles.background}></div>
        <div className={styles.text}>
          <h1>Opendata Bridge</h1>
          <div className="py-3 text-center mx-auto w-[80%]">
            <span className="inline-block">日本全国に対応した</span>
            <span className="inline-block">
              「AI」搭載のオープンデータ検索サービス
            </span>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <SearchInput />
      </div>

      <PromptTemplateList initial={usercassList} />
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
      <Footer />
    </div>
  );
};

export default Home;
