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
            <span className="inline-block">利用目的で探せる</span>
            <span className="inline-block">オープンデータ検索サービス</span>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <SearchInput />
      </div>

      <PromptTemplateList initial={usercassList} />
      <Footer />
    </div>
  );
};

export default Home;
