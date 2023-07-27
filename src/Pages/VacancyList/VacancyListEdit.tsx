import React, { useContext, useEffect, useState } from "react";
import { IVacancyList } from "./VacancyList";
import { LayoutContext } from "../../context/LayoutContext";
import { axiosInstance } from "../../http";
import InputField from "../../components/Input/InputField";

export interface VacancyListEditProps {
  method: string,
  url: string,
  updateData?: IVacancyList | undefined,
  vacancyList: IVacancyList[] | undefined,
  setVacancyList: React.Dispatch<React.SetStateAction<IVacancyList[]|undefined>>,
}

export interface DataValueType {
  position: string,
  location: string,
  subHeading: string,
  salary: string,
  contactNo: string,
  description: string,
  label: string,
}
function VacancyListEdit(props: VacancyListEditProps) {

   const { url, setVacancyList, vacancyList } = props;
   const layoutContextData = useContext(LayoutContext);
   
   const [dataValues, setDataValues] = useState<DataValueType>({
    position: '',
    location: '',
    subHeading: '',
    salary: '',
    contactNo: '',
    description: '',
    label: '',
   })

   useEffect(() => {
    setDataValues({
        position: props.updateData ? props.updateData.position: '',
        location: props.updateData ? props.updateData.location: '',
        subHeading: props.updateData ? props.updateData.subHeading: '',
        salary: props.updateData ? props.updateData?.salary : '',
        contactNo: props.updateData ? props.updateData.contactNo : '',
        description: props.updateData ? props.updateData.description : '',
        label: props.updateData ? props.updateData.label : '',

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
           setDataValues(data)
           if(data) {

          !props.updateData ? (vacancyList && setVacancyList([...vacancyList, data])): (vacancyList && vacancyList.length > 0 && setVacancyList(vacancyList?.map((contact:IVacancyList) => contact.id == data.id ? data : contact)));
           layoutContextData?.setTopSheet(false)
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
          name='position'
          type='text'
          placeholder='Enter Job Position...'
          label="Job Position"
           />

           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name='location'
            type="text"
            placeholder='Enter Location'
            label='Location'
            />
        </div>

        <div style={{ display: 'flex'}}>
           <InputField
             inputValue={dataValues}
             setInputValue={setDataValues}
             name="subHeading"
             type="text"
             placeholder="Enter SubHeading"
             label="SubHeading"
             
            />

            <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name="salary"
            type="text"
            placeholder="Enter Salary"
            label="Salary"
            />
        </div>

         <div style={{display: 'flex'}}>
             <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name="contactNo"
            type="text"
            placeholder="Enter Contact No"
            label="Contact No"
            />
              
           <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name="description"
            type="text"
            placeholder="Enter Description"
            label="Description"
            />
         </div>

         <div style={{ display: 'flex'}}>
             <InputField
            inputValue={dataValues}
            setInputValue={setDataValues}
            name="label"
            type="text"
            placeholder="Enter Label"
            label="Label"
            />
         </div>
        <button onClick={() => addData()} className='text-white px-[20px] py-[10px] hover:text-[#EC1C24] rounded-xl border-[1px] border-white]'>
            {props.method == "POST" ? 'Add' : "Update"}
        </button>
    </div>
  )
}

export default VacancyListEdit;