import React, { useState } from 'react';

interface Tab {
  label: string;
  content: string;
}

export interface TabProps{
  tabData: Tab[];
}

// Tabs component to switch between different content sections
const Tabs: React.FC<TabProps> = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(0);  // Track the active tab

  // Data for the tabs and their content
  // tabData ?? [
  //   { label: 'Tab 1', content: 'Content for Tab 1' },
  //   { label: 'Tab 2', content: 'Content for Tab 2' },
  //   { label: 'Tab 3', content: 'Content for Tab 3' }
  // ];

  return (
    <div >
      {/* Tab headers */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', borderBottom: '2px solid #ccc' }}> */}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {tabData.map((tab, index) => (
          <div
            key={index}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: activeTab === index ? '#6200ea' : '#f1f1f1',
              color: activeTab === index ? 'white' : 'black',
              borderRadius: '4px',
            }}
            onClick={() => setActiveTab(index)}  // Update active tab when clicked
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', marginTop: '10px', borderRadius: '4px', color:'black' }}>
        {tabData[activeTab].content} {/* Show content of the active tab */}
      </div>
    </div>
  );
};

export default Tabs;