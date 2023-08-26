export const metadata = {
  title: 'OpenData Bridge',
  description: '市民とオープンデータをつなぐプラットフォーム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
