import { sql } from '@vercel/postgres';

export const countGood = async (usercaseId: string): Promise<number> => {
  const { rows, fields } =
    await sql`SELECT SUM(CASE WHEN isGood = true THEN 1 ELSE 0 END) FROM feedback WHERE usercaseId = ${usercaseId};`;

  return Number(rows.at(0)?.sum) || 0;
};
