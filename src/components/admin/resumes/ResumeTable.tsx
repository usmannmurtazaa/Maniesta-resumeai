import { Link } from 'react-router-dom';
import type { AdminResume } from '@/types/admin.types';
import { formatDate } from '@/utils/dateUtils';

interface ResumeTableProps {
  resumes: AdminResume[];
}

export function ResumeTable({ resumes }: ResumeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Template
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ATS Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Job Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resumes.map((resume) => (
            <tr key={resume.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">{resume.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{resume.templateId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{resume.atsScore ?? 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {resume.jobDescriptionAttached ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(resume.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(resume.updatedAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  to={`/builder/${resume.id}`}
                  className="text-primary-600 hover:text-primary-800"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
