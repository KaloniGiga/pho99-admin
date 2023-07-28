import {useState, useEffect } from 'react'
import InputField from '../../components/Input/InputField'
import { axiosInstance } from '../../http'
import { server } from '../../utils/fetch'
import { message } from 'antd';

export interface DataValueType {
  id?: number,
  heading: string,
  subHeading: string,
}

function NewsDetails() {

   const [homeDetails, setHomeDetails] = useState<DataValueType>({
      heading: '',
      subHeading: '',
   });
   const [isCreated, setIsCreated] = useState(false);

   useEffect(() => {
     axiosInstance.get('/news-detail')
     .then((res) => {
       if(res.data && res.data.length > 0) {
        setHomeDetails(res.data[0]);
        setIsCreated(true);
       }
     })
     .catch((err) => {
       console.log(err);
     })
   }, [])

   const addData = ()  => {
       axiosInstance({
           url: `${server}/home`,
           method: `${isCreated ? 'PUT': 'POST'}`,
           data: homeDetails,
        }).then((res) => {
          setHomeDetails(res.data); 
          setIsCreated(true);
          message.success('News Details updated!')
        }).catch((error) => {
          console.log(error);
          message.error('Failed to update.')
        })

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
       </div>
  )
}


export default NewsDetails;