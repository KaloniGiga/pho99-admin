import { useState, useEffect, useContext} from 'react';
import { server } from "../../utils/fetch";
import { axiosInstance } from "../../http";
import { AxiosResponse } from "axios";
import { Table, message } from "antd";
import VacancyListEdit from "./VacancyListEdit";
import { LayoutContext } from '../../context/LayoutContext';
import { AuthContext } from '../../context/AuthContext';

export interface IVacancyList {
  id: number,
  position: string,
  location: string,
  subHeading: string,
  salary: string,
  contactNo: string,
  description: string,
  label: string,
}
function VacancyList() {
  
    const url = `${server}/vacancy`;
    const layoutContextData = useContext(LayoutContext);
    const authContextData = useContext(AuthContext);
    const { setJobs } = authContextData || {};
    const [vacancyList, setVacancyList] = useState<IVacancyList[]|undefined>([]);

    useEffect(() => {
       axiosInstance.get(url)
       .then((res: AxiosResponse<IVacancyList[], null>
      ) => {
        const data:IVacancyList[] | null = res.data;
         console.log(data);
          setVacancyList(data);
          if(setJobs) {
            setJobs(data);
          }
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const tableItemDelete = (record) => {
             
         axiosInstance.delete(`${server}/vacancy/${record.id}`)
         .then(() => {
             if(vacancyList && vacancyList.length > 0) {
              const data:IVacancyList[] = vacancyList.filter((vacancy) => vacancy.id !== record.id);
             setVacancyList(data);
             if(setJobs) {
               setJobs(data);
             }
             message.success('Vacancy Item Deleted!')
             }
         }).catch(() => {
            message.error('Deleting failed!')
         })
 
    }

    const columns = [
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
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
              <VacancyListEdit
               vacancyList={vacancyList}
                method="PUT"
                setVacancyList={setVacancyList}
                updateData={vacancyList?.find((data) => data.id == record.id)}
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
            layoutContextData?.setTopSheetContent(<VacancyListEdit vacancyList={vacancyList} setVacancyList={setVacancyList} method="POST" url={url} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add Vacancy
        </button>
                <Table
                 className="custom-table"
                 style={{ background: 'black'}}
                 dataSource={vacancyList}
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';

                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default VacancyList;