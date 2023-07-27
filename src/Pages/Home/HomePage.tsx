import {useState, useEffect } from 'react'
import InputField from '../../components/Input/InputField'
import { axiosInstance } from '../../http'
import { server } from '../../utils/fetch'

export interface DataValueType {
  heading: string,
  subHeading: string,
}

function HomePage() {

   const [homeDetails, setHomeDetails] = useState<DataValueType>({
      heading: '',
      subHeading: '',
   });
   

   useEffect(() => {
     axiosInstance.get('/home')
     .then((res) => {
        setHomeDetails(res.data);
     })
     .catch((err) => {
       console.log(err);
     })
   }, [])

   const addData = ()  => {
       axiosInstance({
           url: `${server}/home`,
           method: `${homeDetails ? 'PUT': 'POST'}`,
           data: homeDetails,
        }).then((res) => {
          setHomeDetails(res.data); 
        }).catch((error) => {
          console.log(error);
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
            {!homeDetails ? 'Add' : 'Update' }
        </button>
       </div>
       </div>
  )
}


export default HomePage