// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const stub = [
  {
    id: 0,
    template_title: 'Weather Information',
    template_description:
      'This template is used to fetch and display weather information.',
    search_prompt: 'Enter the city for which you want to know the weather.',
    data_fetch_prompt: 'Fetch weather data for {city}.',
    data_format_prompt: 'Display the weather data in a readable format.',
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
];

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  let json = stub;

  if (query) {
    json = stub.filter((s) => {
      return (
        s['template_title']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        s['template_description']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      );
    });
  }
  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
