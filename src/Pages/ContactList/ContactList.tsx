import { useContext, useEffect, useState } from "react";
import { server } from "../../utils/fetch";
import { Table, message } from "antd";
import { axiosInstance } from "../../http";
import { AxiosResponse } from "axios";
import ContactListEdit from "./ContactListEdit";
import { LayoutContext } from "../../context/LayoutContext";

export interface IContactList {
  id: number,
  email: string,
  phone: string,
}

function ContactList() {

    const url = `${server}/contact-address`; 
    const layoutContextData = useContext(LayoutContext);
    const [contactList, setContactList] = useState<IContactList[]|undefined>([]);


    useEffect(() => {
       axiosInstance.get(url)
       .then((res: AxiosResponse<IContactList[], null>
      ) => {
        const data:IContactList[] | null = res.data;
         console.log(data);
          setContactList(data);
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const tableItemDelete =  (record) => {
             
         axiosInstance.delete(`${server}/contact-address/${record.id}`)
         .then(() => {
             if(contactList && contactList.length > 0) {
              const data:IContactList[] = contactList.filter((contact) => contact.id !== record.id);
             setContactList(data);
             message.success('Contact list item deleted!')
             }
         }).catch(() => {
            message.error('Deleting failed!')
         })
 
    }

    const columns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
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
              <ContactListEdit
                contactList={contactList}
                setContactList={setContactList}
                method="PUT"
                updateData={contactList?.find((data) => data.id == record.id)}
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
            <div className="mt-4 mx-2">
                <button
             className="mb-4 text-white border-[1px] border-white px-4 py-2 rounded-3xl text-sm hover:text-[red] "
            onClick={() => {
            layoutContextData?.setTopSheetContent(<ContactListEdit contactList={contactList} setContactList={setContactList} method="POST" url={url} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add Contact Address
        </button>
                <Table
                 className="custom-table"
                 style={{ background: 'black'}}
                 dataSource={contactList}
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';
                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default ContactList