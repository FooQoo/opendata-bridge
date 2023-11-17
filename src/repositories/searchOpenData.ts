export type SearchCondition = {
  page: number;
  area: string | undefined;
  keyword: string | undefined;
  format: string | undefined;
  language: 'JAPANESE';
};

export type SearchResponse = {
  searchResultInfo: {
    totalOfHits: number;
  };
  dataset: {
    title: string;
    siteName: string;
    license: string | null;
    files: {
      title: string;
      format: string;
      url: string;
    }[];
    tags: string[];
  }[];
  searchCondition: {
    keyword: string;
    format: string | null;
  };
  showMoreUrl: string;
};

const baseUrl = process.env.SEARCH_OPENDATA_URL;

export const searchOpenData = async (searchOpenData: SearchCondition) => {
  const params: { [key: string]: string } = {};

  if (searchOpenData.keyword) {
    params['keyword'] = searchOpenData.keyword;
  }
  if (searchOpenData.area) {
    params['area'] = searchOpenData.area;
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

  const reponse = await fetch(`${baseUrl}?${urlSearchParam}`, {
    headers: {
      Authorization: `Bearer ${process.env.SEARCH_OPENDATA_API_KEY}`,
    },
  });

  const data = await reponse.json();

  return {
    searchResultInfo: {
      totalOfHits: data.searchResultInfo.totalOfHits,
    },
    dataset: data.dataset.map((dataset: any) => {
      return {
        title: dataset.title,
        siteName: dataset.siteName,
        datasetUrl: dataset.datasetUrl,
        license: dataset.license,
        files: dataset.files.map((file: any) => {
          return {
            title: file.title,
            format: file.format,
            url: file.url,
          };
        }),
        tags: dataset.tags,
      };
    }),
    searchCondition: {
      keyword: data.searchCondition.keyword,
      format: data.searchCondition.format,
    },
    showMoreUrl: data.showMoreUrl,
  };
};
