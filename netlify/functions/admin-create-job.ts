import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { verifyAdminToken } from './_shared/adminAuth';
import { z } from 'zod';

const jobSchema = z.object({
  title: z.string().min(1),
  companyName: z.string().min(1),
  companyLogo: z.string().optional(),
  location: z.string().min(1),
  workMode: z.enum(['remote', 'hybrid', 'onsite']),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  salary: z.string().optional(),
  description: z.string().min(1),
  requiredSkills: z.array(z.string()).default([]),
  preferredSkills: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  applicationUrl: z.string().url(),
  deadline: z.string().optional().nullable(),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'scheduled']),
  featured: z.boolean().default(false),
  scheduledAt: z.string().optional().nullable(),
});

export const handler: Handler = async (event) => {
  const { uid, error } = await verifyAdminToken(event);
  if (error) return error;

  const body = JSON.parse(event.body || '{}');
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input', errors: parsed.error.flatten() }),
    };

  const data = parsed.data;
  const now = admin.firestore.Timestamp.now();
  const docRef = admin.firestore().collection('jobs').doc();
  await docRef.set({
    ...data,
    deadline: data.deadline ? admin.firestore.Timestamp.fromDate(new Date(data.deadline)) : null,
    scheduledAt: data.scheduledAt
      ? admin.firestore.Timestamp.fromDate(new Date(data.scheduledAt))
      : null,
    publishedAt: data.status === 'published' ? now : null,
    createdAt: now,
    updatedAt: now,
    createdBy: uid,
  });

  return { statusCode: 201, body: JSON.stringify({ id: docRef.id }) };
};
