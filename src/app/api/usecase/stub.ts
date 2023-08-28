export const stub = [
  {
    id: 0,
    template_title: '港区の公園を調査する',
    template_description:
      '港区の公園の園緑地緑被状況一覧をCSV形式でダウンロードします。',
    search_prompt: `以下において、A=「港区の公園」とします。  

これからAに関するオープンデータを提供してもらいます。  
ステップごとに考えてみましょう。  

--ステップ1  
Japan OpenDataのプラグインを利用して、Aに関するオープンデータを5件教えてください。  

出力は、「例として以上のオープンデータがありますが、どれかについて詳細をお知りになりたいですか？」としてください。  

もしAに関するオープンデータが見つからない場合、  
Aを代替する検索ワードを3つ考え、それぞれについて検索を行ってください。  
その後、Aとの関連性が高い検索結果を5件教えてください。  

--ステップ2  
データセットを1つ指定するので、そのデータセットについて以下の項目を出力してください。  

出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットのurl
- データセットの説明
- データセットのリソースの一覧
- フォーマット
- ライセンス
`,
    data_fetch_prompt:
      '港区みどりの実態調査（第10次）公園緑地緑被状況一覧 (CSV形式)のリンクについて、download以下を除いたリンクを教えて頂けますか？',
    data_format_prompt: '',
  },
  {
    id: 1,
    template_title: 'Stock Market',
    template_description:
      'This template is used to fetch and display stock market information.',
    search_prompt: 'Enter the stock symbol you want to look up.',
    data_fetch_prompt: 'Fetch stock data for {stock_symbol}.',
    data_format_prompt: 'Display the stock data in a readable format.',
  },
  {
    id: 2,
    template_title: 'Movie Information',
    template_description:
      'This template is used to fetch and display movie information.',
    search_prompt: 'Enter the name of the movie you want to know about.',
    data_fetch_prompt: 'Fetch movie data for {movie_name}.',
    data_format_prompt: 'Display the movie data in a readable format.',
  },
  {
    id: 3,
    template_title: 'Weather Information',
    template_description:
      'This template is used to fetch and display weather information.',
    search_prompt: 'Enter the city for which you want to know the weather.',
    data_fetch_prompt: 'Fetch weather data for {city}.',
    data_format_prompt: 'Display the weather data in a readable format.',
  },
];
