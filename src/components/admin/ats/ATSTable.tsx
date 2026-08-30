import type { AdminATS } from '@/types/admin.types';
import { formatDate } from '@/utils/dateUtils';

interface ATSTableProps {
  analyses: AdminATS[];
}

export function ATSTable({ analyses }: ATSTableProps) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-[800px] w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Resume
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Job Match
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Matched Keywords
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Missing Keywords
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {analyses.map((analysis) => (
            <tr key={analysis.id}>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.userName || 'Unknown'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.resumeTitle || 'Unknown'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.score}</td>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.jobMatchScore ?? 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.matchedKeywords.length}</td>
              <td className="px-6 py-4 whitespace-nowrap">{analysis.missingKeywords.length}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(analysis.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
