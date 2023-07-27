import React, {useContext, useEffect, useState} from 'react';
import { IMenuList } from './MenuList';
import { LayoutContext } from '../../context/LayoutContext';
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';
import { Select, Space } from 'antd';
import { ICategoryList } from '../Category/CategoryList';

export interface MenuListEditProps {
  method: string,
  url: string,
  updateData?: IMenuList | undefined,
  categoryList: ICategoryList[]|null,
  menuList: IMenuList[]|undefined,
  setMenuList: React.Dispatch<React.SetStateAction<IMenuList[]|undefined>>,
}

export interface DataValueType {
  heading: string,
  subHeading: string,
  price: string,
  category: number|null,
}
export interface CategoryType {
  label: string,
  value: number|null,
}

function MenuListEdit(props: MenuListEditProps) {

   const { url, menuList, setMenuList } = props;

   const layoutContextData = useContext(LayoutContext);
   const [category, setCategory] = useState<CategoryType[]|undefined>([])
   const [dataValues, setDataValues] = useState<DataValueType>({
    heading: '',
    subHeading: '',
    price: '',
    category: null,
   })

   useEffect(() => {
    setDataValues({
        heading: props.updateData ? props.updateData.heading: '',
        subHeading: props.updateData ? props.updateData.subHeading: '',
        price: props.updateData ? props.updateData.price: '',
        category: props.updateData ? props.updateData.category.id: null,
    })
   }, [props.updateData])

   useEffect(() => {
     
        setCategory(
          props?.categoryList?.map((category) => {
             return {
                label: category.heading,
                value: category.id,
             }
        })
        )
      
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

           !props.updateData ? (menuList && setMenuList([...menuList, data])) : (menuList && menuList.length > 0 && setMenuList(menuList?.map((news:IMenuList) => news.id == data.id ? data : news)))
           layoutContextData?.setTopSheet(false);
           }
        }).catch((error) => {
            console.log(error);
        })
 
   }

   const handleChange = (value: number) => {
    console.log(value)
      setDataValues({...dataValues, category: value});
   };


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

   <Space align='center'>
    <Select
      style={{ width: 350}}
      onChange={handleChange}
      allowClear
      options={category}
      defaultValue={props.updateData && menuList?.find((menu) => menu.id == props.updateData?.id)?.id}
    />
  </Space>

       </div>

        <button onClick={() => addData()} className='text-white px-[20px] py-[10px] hover:text-[#EC1C24] rounded-xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
    </div>
  )
}

export default MenuListEdit;