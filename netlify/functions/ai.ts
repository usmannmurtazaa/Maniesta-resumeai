import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import * as admin from 'firebase-admin';
import { verifyIdToken } from './_shared/firebaseAdmin'; // we'll add this helper

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

const genAI = new GoogleGenerativeAI(apiKey);

const RequestSchema = z.object({
  action: z.enum(['improve', 'rewrite', 'shorten', 'expand', 'grammar', 'professionalize', 'ats', 'job']),
  text: z.string().min(1).max(5000),
  context: z.string().optional(),
  jobDescription: z.string().optional(),
});

export const handler: Handler = async (event) => {
  // Authenticate user
  const authHeader = event.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
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

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const output = result.response.text();

  return {
    statusCode: 200,
    body: JSON.stringify({
      suggestions: [output],
      explanation: 'AI suggested improvement',
    }),
  };
};

function buildPrompt(action: string, text: string, context?: string, jobDescription?: string): string {
  const factualIntegrity = `
    IMPORTANT: Do not invent any facts, metrics, dates, companies, job titles, degrees, certifications, 
    technologies, achievements, or responsibilities. Only improve the wording of the provided content. 
    If information is missing, suggest to add it but do not fabricate.`;

  let prompt = '';
  switch (action) {
    case 'improve':
      prompt = `Improve the following resume text for clarity, impact, and professionalism. ${factualIntegrity}`;
      break;
    case 'rewrite':
      prompt = `Rewrite the following text to be more compelling and professional. ${factualIntegrity}`;
      break;
    case 'shorten':
      prompt = `Shorten the following text while retaining key information. ${factualIntegrity}`;
      break;
    case 'expand':
      prompt = `Expand the following text with more detail while remaining factual. ${factualIntegrity}`;
      break;
    case 'grammar':
      prompt = `Correct any grammar or spelling errors in the following text. ${factualIntegrity}`;
      break;
    case 'professionalize':
      prompt = `Make the following text sound more professional. ${factualIntegrity}`;
      break;
    case 'ats':
      prompt = `Optimize the following text for ATS (Applicant Tracking Systems) by incorporating relevant keywords and action verbs. ${factualIntegrity}`;
      break;
    case 'job':
      prompt = `Optimize the following text for the job description provided. Use the job description only as context to improve wording; do not fabricate any experience or skills. ${factualIntegrity}`;
      break;
    default:
      prompt = `Improve the following text. ${factualIntegrity}`;
  }
  prompt += `\n\nText: ${text}`;
  if (jobDescription) {
    prompt += `\n\nJob Description:\n${jobDescription}`;
  } else if (context && action !== 'job') {
    prompt += `\n\nContext:\n${context}`;
  }
  return prompt;
}