import PromptTemplateList from 'app/PromptTemplateList';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import { Footer } from 'components/organisms/Footer/Footer';
import usecaseSearchFeatcher from 'lib/axios/usecaseSearchFetcher';

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
          <p className="py-3">
            日本全国に対応した「AI」搭載のオープンデータ検索サービス
          </p>
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
