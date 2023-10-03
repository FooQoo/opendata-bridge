import { authOptions } from 'app/api/auth/[...nextauth]/route';
import PromptTemplateList from 'app/manage/PromptTemplateList';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import { Footer } from 'components/organisms/Footer/Footer';
import usecaseSearchFeatcher from 'lib/axios/usecaseSearchFetcher';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import styles from './Home.module.scss';

const Home = async () => {
  // If you use ssg, you can use the following code.

  const usercassList = await usecaseSearchFeatcher('');

  const session = await getServerSession(authOptions);

  const username = session?.user?.name || 'unknown';

  return (
    <div className="w-full md:w-[80%] mx-0 md:mx-[400px] h-screen mt-20">
      <h2 className="mx-5 text-center text-4xl">
        オープンデータ登録情報管理ページ
      </h2>
      <p className="mx-5 text-center py-4">
        {username}でログイン中です。オープンデータの登録情報は
        <Link href={'/manage/usecase/create'} className="text-blue-700">
          オープンデータ登録情報作成ページ
        </Link>
        で作成できます
      </p>
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
