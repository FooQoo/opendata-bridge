export type SearchCondition = {
  page: number;
  keyword: string | undefined;
  organization: string | undefined;
  category: string | undefined;
  format: string | undefined;
  language: 'JAPANESE';
};

const baseUrl = process.env.SEARCH_OPENDATA_URL;

export const searchOpenData = async (searchOpenData: SearchCondition) => {
  const params: { [key: string]: string } = {};

  if (searchOpenData.keyword) {
    params['keyword'] = searchOpenData.keyword;
  }
  if (searchOpenData.organization) {
    params['organization'] = searchOpenData.organization;
  }
  if (searchOpenData.category) {
    params['category'] = searchOpenData.category;
  }
  if (searchOpenData.format) {
    params['format'] = searchOpenData.format;
  }
  if (searchOpenData.page) {
    params['page'] = searchOpenData.page.toString();
  }
  if (searchOpenData.language) {
    params['language'] = searchOpenData.language;
  }

  const urlSearchParam = new URLSearchParams(params).toString();

  console.info(`${baseUrl}?${urlSearchParam}`);

  const reponse = await fetch(`${baseUrl}?${urlSearchParam}`);

  const data = await reponse.json();

  return data;
};
