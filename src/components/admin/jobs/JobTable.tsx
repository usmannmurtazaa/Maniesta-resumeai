import type { Job } from '@/types/job.types';
import { formatDate } from '@/utils/dateUtils';
import { EditIcon, DeleteIcon, CheckIcon } from '@/components/ui/icons';

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[900px] w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Work Mode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Featured
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Published
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">{job.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.companyName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.workMode}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    job.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : job.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {job.featured && <CheckIcon size={16} className="text-yellow-500" />}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.publishedAt ? formatDate(job.publishedAt) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.deadline ? formatDate(job.deadline) : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button
                  onClick={() => onEdit(job)}
                  className="text-primary-600 hover:text-primary-800"
                  aria-label="Edit"
                >
                  <EditIcon size={18} />
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete"
                >
                  <DeleteIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
