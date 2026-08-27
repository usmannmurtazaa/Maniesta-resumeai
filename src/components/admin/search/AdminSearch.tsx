import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '@/services/admin/adminService';
import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/Input';
import { useAdminStore } from '@/store/adminStore';

export function AdminSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSearchResults } = useAdminStore();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await adminService.search(query);
      setResults(res);
      setSearchResults(res);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users, resumes, jobs..."
          className="pl-10 w-64"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Search"
        >
          <SearchIcon size={18} />
        </button>
      </div>
      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => {
                setResults([]);
                if (result.type === 'user') navigate(`/admin/users/${result.id}`);
                if (result.type === 'resume') navigate(`/admin/resumes?userId=${result.id}`);
                if (result.type === 'job') navigate(`/admin/jobs`);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <span className="font-medium">{result.title}</span>
              {result.subtitle && <span className="text-sm text-gray-500 ml-2">{result.subtitle}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}