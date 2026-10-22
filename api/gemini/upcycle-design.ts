import { generateUpcycleDesign } from '../../src/services/upcycleDesign';

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  return Response.json(await generateUpcycleDesign(payload, process.env.GEMINI_API_KEY));
}

export default async function handler(request: Request): Promise<Response> {
  return POST(request);
}
