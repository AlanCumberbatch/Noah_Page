import React from "react";
import LinkBox from '@/UIComponents/LinkBox';
const WebGPUErrorBox: React.FC = () => {
  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:"center"}}>
      <LinkBox
        text='WebGPU not available.'
        label='WebGPU'
        color="text-blue-800"
        borderColor="border-blue-900"
        width="w-90"
        height="h-90"
      />
    </div>
  ) ;
};

export default WebGPUErrorBox;