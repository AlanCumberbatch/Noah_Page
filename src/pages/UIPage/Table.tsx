// import { useState } from 'react';
import Table from '@/UIComponents/Table';
// import Switch from '@/UIComponents/Switch';

const TableDemo = () => {

  // const [isSortable, setIsSortable] = useState<boolean>(false);
  const columns = ['Name', 'Age', 'Country'];
  const data = [
    { Name: 'Alice', Age: 25, Country: 'USA' },
    { Name: 'Bob', Age: 30, Country: 'Canada' },
    { Name: 'Charlie', Age: 28, Country: 'UK' },
    { Name: 'David', Age: 35, Country: 'Australia' },
  ];

  // const [isChecked, setIsChecked] = useState<boolean>(false);
  // const handleSwitchChange = (checked: boolean) => {
  //   setIsChecked(checked);
  //   setIsSortable(checked);
  // };

  return (
    <>
      {/* <Switch label="Enable Feature" checked={isChecked} onChange={handleSwitchChange} /> */}
      <Table columns={columns} data={data} sortable={true} />
    </>
  );
};

export default TableDemo;