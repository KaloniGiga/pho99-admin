/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { server } from '../../utils/fetch';

export interface UploadAdPopUpType {
  setAddPop:  React.Dispatch<React.SetStateAction<string | null>>,
}
function UploadAdPopUp({setAddPop}:UploadAdPopUpType) {


const props: UploadProps = {
  name: 'adPopUp',
  action: `${server}/ad-pop-up/upload`,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      
      setAddPop(info.file.response.fileName);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

  return (
<Upload {...props}>
    <Button style={{color: 'white', width: '100%'}} icon={<UploadOutlined />}>Change Ad PopUp</Button>
</Upload>
  )
}

export default UploadAdPopUp