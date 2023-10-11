import { OpenAIStream, StreamingTextResponse } from 'ai';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { Configuration, OpenAIApi } from 'openai-edge';
import { ChatCompletionFunctions } from 'openai-edge/types/api';
import { SearchCondition, searchOpenData } from 'repositories/searchOpenData';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime =
  process.env.NODE_ENV === 'development' ? 'nodejs' : 'edge';

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
        area: {
          type: 'string',
          description:
            'Search area. Please enter the geographical area you are interested in. You can specify a region, city, or prefecture.',
        },
        keyword: {
          type: 'string',
          description:
            'Search keyword. If you want to search for multiple keywords, separate them with spaces.',
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
];

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ status: 403 }), {
      status: 403,
    });
  }

  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    stream: true,
    messages,
    functions,
    temperature: 0.0,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      if (name === 'search_opendata') {
        const searchCondition: SearchCondition = {
          page: args.page as number,
          area: args.area as string,
          keyword: args.keyword as string,
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
          temperature: 0.0,
        });
      }
    },
  });

  return new StreamingTextResponse(stream);
}
