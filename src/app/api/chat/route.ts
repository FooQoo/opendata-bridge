import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { ChatCompletionFunctions } from 'openai-edge/types/api';
import { SearchCondition, searchOpenData } from 'repositories/searchOpenData';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const functions: ChatCompletionFunctions[] = [
  {
    name: 'search_opendata',
    description:
      "Search for OpenData in Tokyo. Do not falsify open data when there is no corresponding data in the search results. Should show first user's search condition. Next, should show 'totalOfHits'. Finally, show 'showMoreUrl'. Must not generate your own parameters when not found among the options of organization, category, format.",
    parameters: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number. Default is 1. Minimum is 1.',
        },
        keyword: {
          type: 'string',
          description:
            'Search keyword. If you want to search for multiple keywords, separate them with spaces.',
        },
        organization: {
          type: 'string',
          description:
            'Search organization. Options of Organization are 福岡市,農林水産省,外務省,市民局市民自治推進部広報広聴課,福井県鯖江市,不動産・建設経済局,福岡県,鹿児島県,岐阜県 環境生活部,宮崎県,金融庁,大臣官房統計部,都城市,静岡県 袋井市,台東区,板橋区,静岡県 菊川市,政策局,日進市,佐賀県,三田市,経済産業省,札幌市,千葉県,法務省登記所備付地図データ変換済,財務省,東京都総務局,厚生労働省,栃木県,個人情報保護委員会,福井県,総務省,名古屋市,佐世保市,大津市,新潟市,沖縄県,一般社団法人　社会基盤情報流通推進協議会,人事院,IRDB,埼玉県,江戸川区,長崎県,町田市,兵庫県,環境省,茨城県,京都府,内閣府　中央防災会議　東海地震、東南海・南海地震等に関する専門調査会,内閣府,熊本県,国立研究開発法人　産業技術総合研究所,静岡県 沼津市,公正取引委員会,岩手県,文部科学省,富山県,静岡県 静岡市,港区,船橋市,静岡県,福知山市,東京都福祉保健局,国土交通省,静岡県 島田市,01北海道,大分県,東京都教育庁,大分市,防衛省,山梨県,北九州市,警察庁,法務省,久留米市.',
        },
        category: {
          type: 'string',
          description:
            'Search category. If you want to search for multiple categories, separate them with spaces. Select one of the following options. e.g. 国交DPF,国土数値情報,予算,statistics_survey_result,法務省登記所備付地図データ,5000012080001,農業林業,白書年次報告書等,福祉,2000012010019,予算及び決算の概要,産業,支出,財政,地質,予算決算調達関連情報,経済,国際,統計,統計調査結果,公務他に分類されるものを除く,デジタルシティ,国土,白書年次報告,地図,統計書,地理空間,disaster,security,geospatial,budgets and final_accounts and procurement,契約,災害,環境,人口,エネルギー,調達,防災減災関連情報,研究,医療,environment,安全,教育,健康,地図情報,位置情報,人口世帯,交通,法務省,statistics.',
        },
        format: {
          type: 'string',
          description:
            'Search format. If you want to search for multiple formats, separate them with spaces. Default is unspecified. Option of Format are GTFS,PNG,ZIP,AI,CSV,XLSX,HTML,GeoJSON,DOCX,JSON,XML,GIF,RDF,KML,JPEG,DOC,XISX,WORD,PDF,LAS,TXT,XLS,XCSV,SHP,MP4,OBJ,PLY,PPTX.',
        },
      },
      required: ['page'],
    },
  },
  {
    name: 'plan_idea_for_opendata',
    description: 'Plan idea for OpenData in Tokyo.',
    parameters: {
      type: 'object',
      properties: {
        idea: {
          type: 'string',
          description: 'Idea.',
        },
      },
      required: ['idea'],
    },
  },
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  // const recentMessages = messages.slice(-4);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    stream: true,
    messages,
    functions,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      if (name === 'search_opendata') {
        const searchCondition: SearchCondition = {
          page: args.page as number,
          keyword: args.keyword as string,
          organization: args.organization as string,
          category: args.category as string,
          format: args.format as string,
          language: 'JAPANESE',
        };

        const opendata = await searchOpenData(searchCondition);

        const newMessages = createFunctionCallMessages(opendata);
        return openai.createChatCompletion({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-3.5-turbo-16k',
          functions,
        });
      } else if (name === 'plan_idea_for_opendata') {
        const planData = {
          idea: args.idea as string,
        };
        const newMessages = createFunctionCallMessages(planData);
        return openai.createChatCompletion({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-3.5-turbo-16k',
          functions,
        });
      } else if (name === 'moderation') {
        console.info('moderation', args.response);
      }
    },
  });

  return new StreamingTextResponse(stream);
}
