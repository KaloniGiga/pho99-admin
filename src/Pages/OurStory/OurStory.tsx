import {useState, useEffect } from 'react'
import InputField from '../../components/Input/InputField'
import { axiosInstance } from '../../http'
import { server } from '../../utils/fetch'
import { Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

export interface DataValueType {
  id?: number;
  heading: string,
  subHeading: string,
  fileName?:string,
  path?:string,
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function OurStory() {

   const [homeDetails, setHomeDetails] = useState<DataValueType>({
      heading: '',
      subHeading: '',
   });
   const [isCreated, setIsCreated] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  

   useEffect(() => {
     axiosInstance.get('/ourstory')
     .then((res) => {
       console.log(res.data);
       if(res.data && res.data.length > 0) {
        setHomeDetails(res.data[0]);

        setIsCreated(true);
        if(res.data[0].fileName) {
          setFileList([{
            uid: '1',
            name: res.data[0].fileName,
            status: 'done',
            url: `${server}/story/${res.data[0].fileName}`
          }])
        }
       }
     })
     .catch((err) => {
       console.log(err);
     })
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

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined style={{color: 'white'}} />
      <div style={{ marginTop: 8, color: 'white' }}>Upload</div>
    </div>
  );


   const addData = ()  => {
       axiosInstance({
           url: `${server}/ourstory`,
           method: `${isCreated ? 'PUT': 'POST'}`,
           data: homeDetails,
        }).then((res) => {
          setHomeDetails(res.data); 
          setIsCreated(true);
          message.success('Our story updated!')
        }).catch((error) => {
          console.log(error);
          message.error('Failed to update menu')
        })

   }

  const handleRemove = async () => {
     axiosInstance.delete(`${server}/ourstory/photo/remove/${homeDetails?.id}`)
   }


  return (
    <div>
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={homeDetails}
          setInputValue={setHomeDetails}
          name='heading'
          type='text'
          placeholder='Enter Heading...'
          label="Heading"
           />

           <InputField
            inputValue={homeDetails}
            setInputValue={setHomeDetails}
            name='subHeading'
            type="text"
            placeholder='Enter subHeading'
            label='SubHeading'
            />
        </div>

        <div className='w-full flex justify-end'>
        <button onClick={() => addData()} className='text-white px-[20px] py-[5px] ml-auto mb-4 hover:text-[#EC1C24] rounded-3xl border-[1px] border-white]'>
            {!isCreated ? 'Add' : 'Update' }
        </button>
       </div>

          {isCreated && (<>
      <Upload
        action={`${server}/ourstory/upload/${homeDetails?.id}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="storyPhoto"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>)}
       </div>
  )
}


export default OurStory;