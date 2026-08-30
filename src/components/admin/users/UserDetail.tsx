import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { formatDate } from '@/utils/dateUtils';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

export function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const { selectedUser, setSelectedUser, loading, setLoading } = useAdminStore();
  const [userResumes, setUserResumes] = useState<any[]>([]);
  const [atsAnalyses, setAtsAnalyses] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      setLoading('userDetail', true);
      adminService
        .getUser(userId)
        .then(({ user }) => {
          setSelectedUser(user);
        })
        .finally(() => setLoading('userDetail', false));
      adminService.getUserResumes(userId).then(({ resumes }) => setUserResumes(resumes));
      adminService.getATSAnalyses({ userId }).then(({ analyses }) => setAtsAnalyses(analyses));
    }
  }, [userId, setLoading, setSelectedUser]);

  if (loading.userDetail) return <div>Loading...</div>;
  if (!selectedUser) return <div>User not found</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{selectedUser.displayName || selectedUser.email}</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{selectedUser.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Registered</p>
            <p>{formatDate(selectedUser.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Login</p>
            <p>{selectedUser.lastLoginAt ? formatDate(selectedUser.lastLoginAt) : 'Never'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p>{selectedUser.disabled ? 'Disabled' : 'Active'}</p>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>Resumes</Tab>
          <Tab>ATS Analyses</Tab>
          <Tab>Saved Jobs</Tab>
          <Tab>Job Preferences</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanel index={0}>
          <ul>
            {userResumes.map((resume) => (
              <li key={resume.id}>
                <Link to={`/admin/resumes?userId=${userId}`}>{resume.title}</Link>
              </li>
            ))}
          </ul>
        </TabPanel>
        <TabPanel index={1}>
          <ul>
            {atsAnalyses.map((analysis) => (
              <li key={analysis.id}>
                {analysis.score} - {formatDate(analysis.createdAt)}
              </li>
            ))}
          </ul>
        </TabPanel>
        {/* Other tabs can be implemented similarly */}
      </Tabs>
    </div>
  );
}
