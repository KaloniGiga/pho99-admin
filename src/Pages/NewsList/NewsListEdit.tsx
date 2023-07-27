import React, {useState, useEffect} from 'react'
import { INewsList } from './NewsList'
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';
import { Modal, Upload } from 'antd';
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

export interface NewsListEditProps {
  method: string,
  url: string,
  updateData?: INewsList | undefined,
  setNewsList: React.Dispatch<React.SetStateAction<INewsList[]|undefined>>,
  newsList: INewsList[] | undefined;
}

export interface DataValueType {
  heading: string,
  mainContent: string,
  author: string,
  publishedDate: string,
  fileName: string,
  path: string,
}

function NewsListEdit(props: NewsListEditProps) {
  const { url, setNewsList, newsList } = props;
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
    mainContent: '',
    author: '',
    publishedDate: '',
    fileName: '',
    path: '',
   })

   useEffect(() => {
    setDataValues({
        heading: props.updateData ? props.updateData.heading: '',
        mainContent: props.updateData ? props.updateData.mainContent: '',
        author: props.updateData ? props.updateData.author: '',
        publishedDate: props.updateData ? props.updateData.publishedDate: '',
        fileName: props.updateData ? props.updateData.fileName: '',
        path: props.updateData ? props.updateData.path : '',
    })
   }, [props.updateData])

  useEffect(() => {
     if(newsList && newsList.length > 0 && props.updateData?.fileName  && props.updateData) {
       setFileList(newsList.filter((news) => news.id == props?.updateData?.id).map((news, index) => {
        return {
          uid: `${index}`,
          name: news.fileName,
          status: 'done',
          url: `${server}/news/${news.fileName}`
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
            console.log(data);
           setDataValues(
             data
           )
           
          if(data) {
           !props.updateData ? (newsList && setNewsList([...newsList, data])) : (newsList && newsList.length > 0 && setNewsList(newsList?.map((news:INewsList) => news.id == data.id ? data : news)))
           !props.updateData && setIsCreated(true)
           !props.updateData && setCurrentId(data.id);
          }
          //  layoutContextData?.setTopSheet(false);
        }).catch((error) => {
            console.log(error);
        })
   }

   const handleRemove = async () => {
     axiosInstance.delete(`${server}/news/photo/remove/${props.updateData?.id}`)
   }

  return (
    <div>
  
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name='heading'
          type='text'
          placeholder='Heading'
          label="News Title"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='author'
            type="text"
            placeholder='Enter Author'
            label='Author'
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="publishedDate"
             type="text"
             placeholder="Enter Published Date"
             label="Published Date"
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='mainContent'
            type='text'
            placeholder='Enter main content'
            label='Main Content'
            textArea={true}
            />
        </div>  

       <div className='w-full flex justify-end items-center'>
        <button onClick={() => addData()} className='text-white px-[20px] py-[5px] hover:text-[#EC1C24] rounded-3xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
      </div>
          {isCreated && (<>
      <Upload
        action={`${server}/news/upload/${props.updateData ? props.updateData.id : currentId}`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        name="newsPhoto"
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

export default NewsListEdit