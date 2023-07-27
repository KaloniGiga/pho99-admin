import {useState, useEffect } from 'react'
import InputField from '../../components/Input/InputField'
import { axiosInstance } from '../../http'
import { server } from '../../utils/fetch'

export interface DataValueType {
  heading: string,
  subHeading: string,
}

function MenuDetails() {

   const [menuDetails, setMenuDetails] = useState<DataValueType>({
      heading: '',
      subHeading: '',
   });
   

   useEffect(() => {
     axiosInstance.get('/home')
     .then((res) => {
        setMenuDetails(res.data);
     })
     .catch((err) => {
       console.log(err);
     })
   }, [])

   const addData = ()  => {
       axiosInstance({
           url: `${server}/home`,
           method: `${menuDetails ? 'PUT': 'POST'}`,
           data: menuDetails,
        }).then((res) => {
          setMenuDetails(res.data); 
        }).catch((error) => {
          console.log(error);
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
            {!menuDetails ? 'Add' : 'Update' }
        </button>
       </div>
       </div>
  )
}


export default MenuDetails;