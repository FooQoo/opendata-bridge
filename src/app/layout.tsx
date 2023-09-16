import ProjectLayout from 'components/projects/ProjectLayout/ProjectLayout';

export const metadata = {
  title:
    'OpenData Bridge -日本全国に対応した「AI」搭載のオープンデータ検索サービス-',
  description:
    '市民とオープンデータをつなぐことを目的とした日本全国に対応した「AI」搭載のオープンデータ検索サービス',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-[url('/opendata-bridge-background.svg')] bg-cover bg-fixed">
        <ProjectLayout>{children}</ProjectLayout>
      </body>
    </html>
  );
}
