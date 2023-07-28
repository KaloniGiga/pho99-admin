import React, {useContext, useEffect, useState} from 'react';
import { IMenuList } from './MenuList';
import { LayoutContext } from '../../context/LayoutContext';
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';
import { Modal, Select, Space, Upload, UploadFile, UploadProps, message } from 'antd';
import { ICategoryList } from '../Category/CategoryList';
import { server } from '../../utils/fetch';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface MenuListEditProps {
  method: string,
  url: string,
  updateData?: IMenuList | undefined,
  menuList: IMenuList[]|undefined,
  setMenuList: React.Dispatch<React.SetStateAction<IMenuList[]|undefined>>,
}

export interface DataValueType {
  heading: string,
  subHeading: string,
  price: string,
  fileName: string;
  path: string;
}
export interface CategoryType {
  label: string,
  value: number|null,
}

function MenuListEdit(props: MenuListEditProps) {

  const { url, menuList, setMenuList } = props;
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
    heading: '',
    subHeading: '',
    price: '',
    fileName: '',
    path: '',
   })

   useEffect(() => {
    setDataValues({
        heading: props.updateData ? props.updateData.heading: '',
        subHeading: props.updateData ? props.updateData.subHeading: '',
        price: props.updateData ? props.updateData.price: '',
        fileName: props.updateData ? props.updateData.fileName: '',
        path: props.updateData ? props.updateData.path : '',
    })
   }, [props.updateData])

  useEffect(() => {
     if(menuList && menuList.length > 0 && props.updateData?.fileName  && props.updateData) {
       setFileList(menuList.filter((news) => news.id == props?.updateData?.id).map((news, index) => {
        console.log(news);
        return {
          uid: `${index}`,
          name: news.fileName,
          status: 'done',
          url: `${server}/menuPhoto/${news.fileName}`
        }
       }))
     }
   }, [])
 
   useEffect(() => {
   if(props.updateData) {
    setIsCreated(true);
   }
  }, [props.updateData])

   const addData = ()  => {
     
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
           !props.updateData ? (menuList && setMenuList([...menuList, data])) : (menuList && menuList.length > 0 && setMenuList(menuList?.map((news:IMenuList) => news.id == data.id ? data : news)))
            !props.updateData && setIsCreated(true);
            !props.updateData && setCurrentId(data.id);

           }

           message.success('menu Item Updated!')
        }).catch((error) => {
            console.log(error);
            message.error('Failed to update!')
        })
 
   }

 const handleRemove = async () => {
     axiosInstance.delete(`${server}/menu/photo/remove/${props.updateData?.id}`)
     .then(() => {
       setFileList([])  
     })
   }

  return (
    <div>
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name='heading'
          type='text'
          placeholder='Enter Heading'
          label="Heading"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='subHeading'
            type="text"
            placeholder='Enter subHeading'
            label='SubHeading'
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="price"
             type="text"
             placeholder="Enter Price..."
             label="Price"
            />

            {/* <InputField
              inputValue={dataValues}
              setInputValue={setDataValues}
              name="category"
              type='text'
              placeholder='Enter Category...'
              label='Category'
             /> */}

       </div>
      
       <div className='w-full flex justify-end items-center'>
        <button onClick={() => addData()} className='text-white px-[20px] py-[10px] hover:text-[#EC1C24] rounded-xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
     </div>

    {isCreated && (<>
      <Upload
        action={`${server}/menu/upload/${props.updateData ? props.updateData.id : currentId}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="menuPhoto"
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

export default MenuListEdit;