import { useContext, useEffect, useState } from "react";
import { server } from "../../utils/fetch";
import { Table, message } from "antd";
import { axiosInstance } from "../../http";
import { AxiosResponse } from "axios";
import ContactMessageEdit from "./ContactMessageEdit";
import { LayoutContext } from "../../context/LayoutContext";
import { AuthContext } from "../../context/AuthContext";

export interface IContactMessage {
    id: number,
    name: string,
    email: string,
    message: string,
}
const ContactMessage = () => {
    const url = `${server}/contact-message`;
    const layoutContextData = useContext(LayoutContext);
    const authContextData = useContext(AuthContext);
    const {setContactMessage} = authContextData || {};
    const [contactMess, setContactMess] = useState<IContactMessage[]|undefined>([]);


    useEffect(() => {
       axiosInstance.get(url)
       .then((res: AxiosResponse<IContactMessage[], null>
      ) => {
        const data:IContactMessage[] | null = res.data;
         console.log(data);
         if(setContactMessage) {
           setContactMessage(data);
         }
          setContactMess(data);
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const tableItemDelete =  (record) => {
             
         axiosInstance.delete(`${server}/contact-message/${record.id}`)
         .then(() => {
          if(contactMess && contactMess.length > 0) {
            const data:IContactMessage[] = contactMess.filter((contact) => contact.id !== record.id);
            setContactMess(data);
            if(setContactMessage) {
            setContactMessage(data);
            }
            message.success('contact message deleted!')
            }
         }).catch(() => {
            message.error('Deleting failed!')
         })
 
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => (
           <div>{text}</div>
        )
       
      },
      {
       title: "View",
       key: 'view',
       render: (record) => (
         <button 
         className="px-2 py-1 rounded-2xl border-2 border-white hover:text-[#EC1C24]"
         onClick={() => {
            console.log('eh')
            layoutContextData?.setTopSheetContent(
              <ContactMessageEdit
                method="PUT"
                updateData={contactMess?.find((data) => data.id == record.id)}
                url={url}
              />
            )
            layoutContextData?.setTopSheet(true);
            // tableItemsEdit(record);
         }}
         >
            View
         </button>
       )
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (record) => (
          <button 
          className="px-2 py-1 border-2 hover:text-[#EC1C24] border-white rounded-2xl"
           onClick={() => tableItemDelete(record)}
          >
            Delete
          </button>
        )
      }
    ]


    return (
        <div>
            <div className="mt-8 mx-2">
                <Table
                 className="custom-table"
                 style={{ background: 'black'}}
                 dataSource={contactMess}
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';

                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default ContactMessage;