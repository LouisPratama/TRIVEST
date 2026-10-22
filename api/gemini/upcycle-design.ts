import { generateUpcycleDesign } from '../../src/services/upcycleDesign';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method !== 'POST') {
    response.statusCode = 405;
    response.setHeader('Allow', 'POST');
    response.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  let payload = request.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      response.statusCode = 400;
      response.end(JSON.stringify({ error: 'Request body must be valid JSON.' }));
      return;
    }
  }

  const result = await generateUpcycleDesign(payload, process.env.GEMINI_API_KEY);
  response.statusCode = 200;
  response.end(JSON.stringify(result));
}
