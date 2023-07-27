import {useContext, useState, useEffect} from 'react';
import { IContactList } from './ContactList';
import { LayoutContext } from '../../context/LayoutContext';
import { axiosInstance } from '../../http';
import InputField from '../../components/Input/InputField';

export interface ContactListEditProps {
    method: string,
    url: string,
    updateData?: IContactList | undefined,
    setContactList: React.Dispatch<React.SetStateAction<IContactList[]|undefined>>,
    contactList: IContactList[] | undefined;
}

export interface DataValueType {
    email: string,
    phone: string,
}

function ContactListEdit(props: ContactListEditProps) {

  const { url, setContactList, contactList } = props;

   const layoutContextData = useContext(LayoutContext);
   
   const [dataValues, setDataValues] = useState<DataValueType>({
    email: '',
    phone: '',
    
   })

   useEffect(() => {
    setDataValues({
        email: props.updateData ? props.updateData.email: '',
        phone: props.updateData ? props.updateData.phone: '',
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
            console.log(data)
            console.log(contactList);
           setDataValues(
             data
           )
           if(data) {
            !props.updateData ? (contactList && setContactList([...contactList, data])): (contactList && contactList.length > 0 && setContactList(contactList?.map((contact:IContactList) => contact.id == data.id ? data : contact)));
             layoutContextData?.setTopSheet(false);
           }
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
          name='email'
          type='email'
          placeholder='Enter Email...'
          label="Email"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='phone'
            type="text"
            placeholder='Enter Phone'
            label='Phone'
            />
        </div>

        {/* <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="message"
             type="text"
             placeholder="Enter Message..."
             label="Message"
             textArea={true}
            />
        </div> */}

        <button onClick={() => addData()} className='text-white px-[20px] py-[10px] hover:text-[#EC1C24] rounded-xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
    </div>
  )
}

export default ContactListEdit