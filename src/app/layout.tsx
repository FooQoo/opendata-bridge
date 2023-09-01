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
      <body>
        <ProjectLayout>{children}</ProjectLayout>
      </body>
    </html>
  );
}
