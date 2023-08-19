// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sleepService from 'service/sleepService';

const stub = [
  {
    link: 'https://nextjs.org/docs',
    title: 'Documentation',
    description: 'Find in-depth information about Next.js features and API.',
  },
  {
    link: 'https://nextjs.org/learn',
    title: 'Learn',
    description: 'Learn about Next.js in an interactive course with quizzes!',
  },
  {
    link: 'https://github.com/vercel/next.js/tree/canary/examples',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Next.js projects.',
  },
  {
    link: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    title: 'Deploy',
    description:
      'Instantly deploy your Next.js site to a public URL with Vercel.',
  },
];

export async function GET(req: Request) {
  await sleepService(3000);
  const json = stub.sort(() => Math.random() - 0.5);

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
