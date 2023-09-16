import { sql } from '@vercel/postgres';
import { Feedback } from 'types/feedback';

const insertFeedback = async (feedback: Feedback) => {
  return await sql`INSERT INTO feedback (usercaseId, isGood, isBad) VALUES (${feedback.usercaseId}, ${feedback.isGood}, ${feedback.isBad});`;
};

export async function POST(req: Request) {
  console.info('POST ' + req.url);

  const feedback: Feedback = await req.json();

  try {
    await insertFeedback(feedback);
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        status: 500,
      })
    );
  }

  return new Response(
    JSON.stringify({
      status: 201,
    })
  );
}
