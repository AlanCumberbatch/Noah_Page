import Tabs, { TabProps } from '@/UIComponents/Tabs';


// Tabs component to switch between different content sections
const TabsDemo = () => {

  // Data for the tabs and their content
  const tabData:TabProps['tabData'] = [
    { label: 'Tab 1', content: 'Content for Tab 1' },
    { label: 'Tab 2', content: 'Content for Tab 2' },
    { label: 'Tab 3', content: 'Content for Tab 3' }
  ];

  return (
    <Tabs tabData={tabData} />
  );
};

export default TabsDemo;