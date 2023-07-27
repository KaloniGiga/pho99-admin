import { useEffect, useState } from 'react'
import { IContactMessage } from './ContactMessage'
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';

export interface ContactMessageEditProps {
    method: string,
    url: string,
    updateData: IContactMessage | undefined,
}

export interface DataValueType {
    name: string,
    email: string,
    message: string,
}

function ContactMessageEdit(props: ContactMessageEditProps) {
   const { url } = props; 
   const [dataValues, setDataValues] = useState<DataValueType>({
    name: '',
    email: '',
    message: '',
   })

   useEffect(() => {
    setDataValues({
        name: props.updateData ? props.updateData.name: '',
        email: props.updateData ? props.updateData.email: '',
        message: props.updateData ? props.updateData.message: ''
    })
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
        }).catch((error) => {
            console.log(error);
        })
 
   }


  return (
    <div>
        <div style={{ display: 'flex'}}>
          <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name='name'
          type='text'
          placeholder='Enter Name...'
          label="Name"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='email'
            type="email"
            placeholder='Enter Email'
            label='Email'
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="message"
             type="text"
             placeholder="Enter Message..."
             label="Message"
             textArea={true}
            />
        </div>

        <button onClick={() => addData()} className='text-white px-[20px] py-[10px] hover:text-[#EC1C24] rounded-xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
    </div>
  )
}

export default ContactMessageEdit;