import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { auth } from './_shared/firebaseAdmin';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

const genAI = new GoogleGenerativeAI(apiKey);

const RequestSchema = z.object({
  action: z.enum([
    'improve',
    'rewrite',
    'shorten',
    'expand',
    'grammar',
    'professionalize',
    'ats',
    'job',
  ]),
  text: z.string().min(1).max(5000),
  context: z.string().optional(),
  jobDescription: z.string().optional(),
});

export const handler: Handler = async (event) => {
  const authHeader = event.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await auth.verifyIdToken(token);
    if (!decoded.uid) {
      return { statusCode: 401, body: JSON.stringify({ message: 'Invalid token' }) };
    }
  } catch {
    return { statusCode: 401, body: JSON.stringify({ message: 'Invalid token' }) };
  }

  const body = JSON.parse(event.body || '{}');
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid request' }) };
  }

  const { action, text, context, jobDescription } = parsed.data;
  const prompt = buildPrompt(action, text, context, jobDescription);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const result = await model.generateContent(prompt);
    const output = result.response.text().trim();

    return {
      statusCode: 200,
      body: JSON.stringify({
        suggestions: [output],
        explanation: 'AI suggested improvement',
      }),
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'AI generation failed' }) };
  }
};

function buildPrompt(
  action: string,
  text: string,
  context?: string,
  jobDescription?: string
): string {
  const factualIntegrity = `
    STRICT RULES:
    - Only use information explicitly provided in the user's text or context.
    - Do NOT invent companies, job titles, degrees, certifications, skills, metrics, dates, or responsibilities.
    - If the text is very short, expand it into a professional statement using only what is provided.
    - Do NOT ask for more information or give suggestions like "Add your work experience."
    - Do NOT include phrases like "Here is the improved..." or "Sure, I can help.".
    - Output ONLY the improved text itself. No headings, no bullet points, no explanations.`;

  const examples = `
    Example:
    Input: "Usman Murtaza"
    Output: "Usman Murtaza is a dedicated professional focused on building high-quality solutions and delivering measurable results."
    
    Example:
    Input: "Managed a team and improved sales."
    Output: "Managed a team and improved sales performance."
  `;

  let prompt = '';
  switch (action) {
    case 'improve':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Improve the following text for clarity, impact, and professionalism.`;
      break;
    case 'rewrite':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Rewrite the following text to be more compelling and professional.`;
      break;
    case 'shorten':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Shorten the following text while retaining key information.`;
      break;
    case 'expand':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Expand the following text with more detail while remaining factual.`;
      break;
    case 'grammar':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Correct any grammar or spelling errors in the following text.`;
      break;
    case 'professionalize':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Make the following text sound more professional.`;
      break;
    case 'ats':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Optimize the following text for ATS (Applicant Tracking Systems) by incorporating relevant keywords and action verbs.`;
      break;
    case 'job':
      prompt = `You are Maniesta AI, a professional resume writing assistant. Optimize the following text for the job description provided. Use the job description only as context to improve wording; do not fabricate any experience or skills.`;
      break;
    default:
      prompt = `You are Maniesta AI, a professional resume writing assistant. Improve the following text.`;
  }

  prompt += `\n\n${factualIntegrity}\n\n${examples}`;
  prompt += `\n\nText: "${text}"`;

  if (jobDescription) {
    prompt += `\n\nJob Description:\n${jobDescription}`;
  } else if (context && action !== 'job') {
    prompt += `\n\nContext:\n${context}`;
  }

  return prompt;
}