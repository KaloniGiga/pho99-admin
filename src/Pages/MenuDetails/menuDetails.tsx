import {useState, useEffect } from 'react'
import InputField from '../../components/Input/InputField'
import { axiosInstance } from '../../http'
import { server } from '../../utils/fetch'
import { message } from 'antd';

export interface DataValueType {
  id?:number,
  heading: string,
  subHeading: string,
}

function MenuDetails() {

   const [menuDetails, setMenuDetails] = useState<DataValueType>({
      heading: '',
      subHeading: '',
   });
   
   const [isCreated, setIsCreated] = useState(false);
   

   useEffect(() => {
     axiosInstance.get('/menu-detail')
     .then((res) => {
      console.log(res.data);
       if(res.data && res.data.length > 0) {
        setMenuDetails(res.data[0]);
        setIsCreated(true);
       }
     })
     .catch((err) => {
       console.log(err);
     })
   }, [])

   const addData = ()  => {
       axiosInstance({
           url: `${server}/menu-detail`,
           method: `${isCreated ? 'PUT': 'POST'}`,
           data: menuDetails,
        }).then((res) => {
          setMenuDetails(res.data);
          setIsCreated(true); 
          message.success("Menu updated")
        }).catch((error) => {
          console.log(error);
           message.error('Failed to update')
        })

   }

  return (
    <div>
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={menuDetails}
          setInputValue={setMenuDetails}
          name='heading'
          type='text'
          placeholder='Enter Heading...'
          label="Heading"
           />

           <InputField
            inputValue={menuDetails}
            setInputValue={setMenuDetails}
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
       </div>
  )
}


export default MenuDetails;