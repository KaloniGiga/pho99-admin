import {useContext, useState, useEffect} from 'react'
import { server } from '../../utils/fetch';
import { LayoutContext } from '../../context/LayoutContext';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../http';
import { Table, message } from 'antd';
import LocationListEdit from './LocationListEdit';

export interface LocationGallery {
  id: number,
  fileName: string,
  path: string,
  originalFileName: string,
}
export interface ILocationList {
  id: number,
  locationName: string,
  mainContent: string,
  locationSubHeading: string,
  phoneNumber: string,
  link: string,
  locationGallery: LocationGallery[],
}

function LocationList() {
    const url = `${server}/location`;
    const layoutContextData = useContext(LayoutContext);
    const [vacancyList, setVacancyList] = useState<ILocationList[]|undefined>([]);
    

    useEffect(() => {
       axiosInstance.get(url)
       .then((res: AxiosResponse<ILocationList[], null>
      ) => {
        const data:ILocationList[] | null = res.data;
         console.log(data);
          setVacancyList(data);
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const tableItemDelete =  (record) => {
             
         axiosInstance.delete(`${server}/location/${record.id}`)
         .then(() => {
          if(vacancyList && vacancyList.length > 0) {
            const data:ILocationList[] = vacancyList.filter((vacancy) => vacancy.id !== record.id);
            setVacancyList(data);
            message.success('Location Item deleted!')
          }
         }).catch(() => {
            message.error('Deleting failed!')
         })
 
    }

    const columns = [
      {
        title: 'Locotion',
        dataIndex: 'locationName',
        key: 'locationName',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
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
              <LocationListEdit
              locationList={vacancyList}
               setLocationList={setVacancyList}
                method="PUT"
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
            layoutContextData?.setTopSheetContent(<LocationListEdit locationList={vacancyList} setLocationList={setVacancyList} method="POST" url={url} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add Location
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

export default LocationList