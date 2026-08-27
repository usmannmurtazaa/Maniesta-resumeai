import { useResumeStore } from '@/store/resumeStore';
import SectionEditor from './SectionEditor';
import DesignPanel from './DesignPanel';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

export default function EditorPanel() {
  return (
    <div className="p-4">
      <Tabs>
        <TabList>
  <Tab>Content</Tab>
  <Tab>Design</Tab>
</TabList>
<TabPanel index={0}>
  <SectionEditor />
</TabPanel>
<TabPanel index={1}>
  <DesignPanel />
</TabPanel>
      </Tabs>
    </div>
  );
}