// import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// import DynamicGradientText from '@/UIComponents/DynamicGradientText';
import ButtonDemo from './Button';
import ModalDemo from "./Modal";
import TextFieldDemo from "./TextField";
import ProgressDemo from "./Progress";
import CheckboxDemo from "./MultiCheckbox";
import RadioDemo from "./Radio";
import SwitchDemo from "./Switch";
import CardDemo from "./Card";
import AppBarDemo from "./AppBar";
import TabsDemo from "./Tabs";
import SnackbarDemo from "./Snackbar";
// import Drawer from "./Drawer";
import TableDemo from "./Table";
import InputDemo from "./InputDemo";
import SelectDemo from "./Select";
import DatePickerDemo from "./DatePicker";
import Form from "./Form";

// •	按钮（Button）
// •	弹出框（Modal）
// •	输入框（TextField）
// •	进度条（Progress）
// •	表单控件（Checkbox、Radio、Switch）
// •	卡片（Card）
// •	导航（AppBar、Drawer、Tabs）
// •	通知（Snackbar）
// •	输入框（Input）
// •	表单（Form）
// •	表格（Table）
// •	选择器（Select）
// •	时间选择器（DatePicker）




// const ThreePage = () => {
const UIPage: React.FC = () => {

  const wrapClass = { maxWidth: '400px', margin: '10px auto', paddingBottom: '6px', borderBottom: '1px solid #fff' };
  const wrapTitleClass = { fontWeight:'900' };

  const UIComponents = [
    {
      name: 'Snackbar',
      demo: <SnackbarDemo/>
    },
    {
      name: 'Button',
      demo: <ButtonDemo/>
    },
    {
      name: 'Modal',
      demo: <ModalDemo/>
    },
    {
      name: 'TextField',
      demo: <TextFieldDemo/>
    },
    {
      name: 'Progress',
      demo: <ProgressDemo/>
    },
    {
      name: 'Checkbox',
      demo: <CheckboxDemo />
    },
    {
      name: 'Radio',
      demo: <RadioDemo />
    },
    {
      name: 'Switch',
      demo: <SwitchDemo />
    },
    {
      name: 'Card',
      demo: <CardDemo />
    },
    {
      name: 'AppBar',
      demo: <AppBarDemo />
    },
    {
      name: 'Tabs',
      demo: <TabsDemo />
    },

    {
      name: 'Table',
      demo: <TableDemo />
    },
    {
      name: 'Input',
      demo: <InputDemo />
    },

    {
      name: 'Select',
      demo: <SelectDemo />
    },
    {
      name: 'DatePicker',
      demo: <DatePickerDemo />
    },
    {
      name: 'Form',
      demo: <Form />
    },
  ];

  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div>

      {/* <div className='h-12'></div> */}

      <div className='px-4 pt-20'>
        {UIComponents.map((component, index) => (
          <div style={wrapClass} key={component.name + index}>
            <h3 style={wrapTitleClass}>{component.name}</h3>
            {component.demo}
          </div>
        ))}
      </div>
      {/* <div className='h-100vh relative'>
        <Drawer />
        // 待定
        </div> */}

    </div>
  );
}

export default UIPage;