import React, { useEffect, useState } from 'react'
import { ILocationList } from './LocationList';
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';
import { Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { server } from '../../utils/fetch';


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface LocationListEditProps {
    locationList: ILocationList[]|undefined;
    method: string,
    url: string,
    updateData?: ILocationList | undefined,
    setLocationList: React.Dispatch<React.SetStateAction<ILocationList[]|undefined>>
}

export interface DataValueType {
  locationName: string,
  mainContent: string,
  locationSubHeading: string,
  phoneNumber: string,
  link: string,
}

function LocationListEdit(props: LocationListEditProps) {
  const { url, setLocationList, locationList } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isCreated, setIsCreated] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

   const [dataValues, setDataValues] = useState<DataValueType>({
    locationName: '',
    mainContent: '',
    locationSubHeading: '',
    phoneNumber: '',
    link: '',
   })

   useEffect(() => {
    setDataValues({
        locationName: props.updateData ? props.updateData.locationName: '',
        mainContent: props.updateData ? props.updateData.mainContent: '',
        locationSubHeading: props.updateData ? props.updateData.locationSubHeading: '',
        phoneNumber: props.updateData ? props.updateData.phoneNumber : '',
        link: props.updateData && props.updateData.link ? props.updateData.link : '',
    })
   }, [props.updateData])

   useEffect(() => {
     if(props.updateData) {
      setIsCreated(true);
     }
   },[props.updateData])


   useEffect(() => {
    if(props?.updateData?.locationGallery){
    setFileList(props?.updateData?.locationGallery?.map((img):UploadFile<any> => {
       return {
         uid: img.id.toString(),
         name: img.fileName,
         status: 'done',
         url: `${server}/locationGallery/${img.fileName}`
       };
     }));
    }
   }, [])
 
   const addData = ()  => {
        console.log(dataValues);
       axiosInstance({
            url: url,
            method: props.method,
            data: 
                props.updateData ? {
                    ...dataValues, id: props.updateData.id
                } 
                :
                 { ...dataValues }
            
        }).then((res) => {
            const data = res.data;
           setDataValues(
             data
           )
            if(data) {
            !props.updateData ? (locationList && setLocationList([...locationList, data])) : (locationList && locationList.length > 0 && setLocationList(locationList?.map((news:ILocationList) => news.id == data.id ? data : news)))

            !props.updateData && setIsCreated(true);
            message.success(`Location Item ${props.updateData ? 'updated': 'created'}`)
            !props.updateData && setCurrentId(data.id);
            }
        }).catch((error) => {
            console.log(error);
        })
 
   }

   const handleRemove = async (file: UploadFile) => {
     axiosInstance.delete(`${server}/location-photo-gallery/${file.uid}`)
   }

  return (
    <div>
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name='locationName'
          type='text'
          placeholder='Enter Location Name...'
          label="Location Name"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='mainContent'
            type="text"
            placeholder='Enter Main Content'
            label='Main Content'
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="locationSubHeading"
             type="text"
             placeholder="Enter Location SubHeading..."
             label="Sub Heading"
             
            />

             <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="phoneNumber"
             type="text"
             placeholder="Enter Phone Number..."
             label="Phone Number"
            />
            
        </div>
        <div >
            <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="link"
             type="text"
             placeholder="Enter Food Delivery Link..."
             label="Food Delivery Link"
            />
        </div>
        <div className='w-full flex justify-end'>
        <button onClick={() => addData()} className='text-white px-[20px] py-[5px] ml-auto mb-4 hover:text-[#EC1C24] rounded-3xl border-[1px] border-white]'>
            { props.method == "POST" ? (!isCreated ? 'Add' : 'Update' ): "Update"}
        </button>
       </div>
    {isCreated && <>
      <Upload
        action={`${server}/location/upload/${props?.updateData ? props.updateData.id : currentId}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="locationPhoto"
        multiple
      >
        {uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>}
    </div>
  )
}

export default LocationListEdit;