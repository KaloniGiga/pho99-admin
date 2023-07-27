import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { server } from '../../utils/fetch';
import { axiosInstance } from '../../http';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function GalleryList() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
     axiosInstance.get(`${server}/gallery/fetch`)
     .then((res) => {
      setFileList(res.data?.map((img) => {
        return {
          uid: img.id,
           name: img.fileName,
            status: 'done',
             url: `${server}/gallery/${img.fileName}`
            }}))
      console.log(res.data)
    }).catch((error) => console.log(error));
  }, []) 

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
  }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleRemove = async (file: UploadFile) => {
     axiosInstance.delete(`${server}/gallery`, {data: {id: file.uid}})
     .then(() => {
      message.success('Photo deleted successfully')
       return true;
     })
     .catch((error) => {
       console.log(error);
       message.error('Failed to delete photo.');
       return false;
     })
  }
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined style={{color: 'white'}} />
      <div style={{ marginTop: 8, color: 'white' }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action={`${server}/gallery`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="galleryPhoto"
        multiple
      >
       { uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default GalleryList;