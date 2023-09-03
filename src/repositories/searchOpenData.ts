export type SearchCondition = {
  page: number;
  keyword: string | undefined;
  organization: string | undefined;
  category: string | undefined;
  format: string | undefined;
  language: 'JAPANESE';
};

export type SearchResponse = {
  searchResultInfo: {
    totalOfHits: number;
  };
  dataset: {
    title: string;
    license: string | null;
    files: {
      title: string;
      format: string;
      url: string;
    }[];
  }[];
  searchCondition: {
    keyword: string;
    organization: string | null;
    category: string | null;
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

  return {
    searchResultInfo: {
      totalOfHits: data.searchResultInfo.totalOfHits,
    },
    dataset: data.dataset.map((dataset: any) => {
      return {
        title: dataset.title,
        datasetUrl: dataset.datasetUrl,
        license: dataset.license,
        files: dataset.files.map((file: any) => {
          return {
            title: file.title,
            format: file.format,
            url: file.url,
          };
        }),
      };
    }),
    searchCondition: {
      keyword: data.searchCondition.keyword,
      organization: data.searchCondition.organization,
      category: data.searchCondition.category,
      format: data.searchCondition.format,
    },
    showMoreUrl: data.showMoreUrl,
  };
};
