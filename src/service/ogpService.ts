import axios from 'axios';

export type Ogp = {
  title: string;
  description: string;
  url: string;
};

export default async function fetchOgp(url: string): Promise<Ogp> {
  const response = await axios.get(url);
  const html = response.data;

  const getMetaContent = (name: string) => {
    const regex = new RegExp(`<meta property="${name}" content="([^"]+)"`);
    const match = html.match(regex);
    return match ? match[1] : null;
  };

  return {
    title: getMetaContent('og:title'),
    description: getMetaContent('og:description'),
    url,
  };
}
