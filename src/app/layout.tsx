import ProjectLayout from 'components/projects/ProjectLayout/ProjectLayout';

export const metadata = {
  title: 'OpenData Bridge',
  description: '市民とオープンデータをつなぐプラットフォーム',
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
