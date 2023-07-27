import React, { useState, useEffect} from 'react'
import { ICategoryList } from './CategoryList';
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

export interface CategoryListEditProps {
  method: string,
  url: string,
  updateData?: ICategoryList | undefined,
  categoryList: ICategoryList[]|undefined,
  setCategoryList: React.Dispatch<React.SetStateAction<ICategoryList[]|undefined>>
}

export interface DataValueType {
  heading: string,
  subHeading: string,
}

function CategoryListEdit(props: CategoryListEditProps) {
  const { url, setCategoryList, categoryList } = props;
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
   })

   useEffect(() => {
    setDataValues({
        heading: props.updateData ? props.updateData.heading: '',
        subHeading: props.updateData ? props.updateData.subHeading: '',
       })
   }, [props.updateData])

   useEffect(() => {
     if(props.updateData) {
      setIsCreated(true);
     }
   }, [props.updateData])

  useEffect(() => {
   if(props.updateData?.categoryImage){
    setFileList(props?.updateData?.categoryImage?.map((img):UploadFile<any> => {
       return {
         uid: img.id.toString(),
         name: img.fileName,
         status: 'done',
         url: `${server}/categoryPhoto/${img.fileName}`
       }
    }))
   }
  }, [])
 
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

           !props.updateData ? (categoryList && setCategoryList([...categoryList, data])) : (categoryList && categoryList.length > 0 && setCategoryList(categoryList?.map((news:ICategoryList) => news.id == data.id ? data : news)))
           !props.updateData && setIsCreated(true)
           !props.updateData && setCurrentId(data.id);
           message.success(`Category Item ${!props.updateData ? 'created' : 'updated'!}`)
          }
        }).catch((error) => {
            console.log(error);
            message.error(`Failed to ${!props.updateData ? 'create' : 'update'}`)
        })
   }



   const handleRemove = async () => {
     axiosInstance.delete(`${server}/category-photo/${props?.updateData?.id}`)
   }

  return (
    <div>
    
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name='heading'
          type='text'
          placeholder='Enter Category Title'
          label="title"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='subHeading'
            type="text"
            placeholder='Enter description'
            label='Description'
            />
        </div>

        {/* <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="message"
             type="text"
             placeholder="Enter ..."
             label="Message"
             textArea={true}
            />
        </div> */}
     <div className='w-full flex justify-end mb-8'>
        <button onClick={() => addData()} className='text-white px-[20px] py-[5px] ml-auto hover:text-[#EC1C24] rounded-3xl border-[1px] border-white]'>
            {props.method == "POST" ? (!isCreated ?  'Add' : "Update" ): "Update"}
        </button>
    </div>
    {isCreated && <>
       <Upload
        action={`${server}/category/upload/${props.updateData ? props.updateData.id : currentId}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="categoryPhoto"
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

export default CategoryListEdit;