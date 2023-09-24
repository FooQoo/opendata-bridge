import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import ProjectLayout from 'components/projects/ProjectLayout/ProjectLayout';
import { getServerSession } from 'next-auth/next';

config.autoAddCss = false;

export const metadata = {
  title:
    'OpenData Bridge -日本全国に対応した「AI」搭載のオープンデータ検索サービス-',
  description:
    '市民とオープンデータをつなぐことを目的とした日本全国に対応した「AI」搭載のオープンデータ検索サービス',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ja">
      <body className="bg-[url('/opendata-bridge-background.svg')] bg-cover bg-fixed">
        <ProjectLayout session={session || undefined}>{children}</ProjectLayout>
      </body>
    </html>
  );
}
