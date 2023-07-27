import { useEffect, useState, useContext} from 'react';
import { server } from '../../utils/fetch';
import { LayoutContext } from '../../context/LayoutContext';
import { AxiosResponse } from 'axios';
import MenuListEdit from './MenuListEdit';
import { Table, message } from 'antd';
import { axiosInstance } from '../../http';
import { ICategoryList } from '../Category/CategoryList';

export interface CategoryProps {
  id: number;
  heading: string;
}

export interface IMenuList {
   id: number,
   heading: string,
   subHeading: string,
   price: string,
   category: CategoryProps,
}

function MenuList() {
    
    const url = `${server}/menu`;
    const layoutContextData = useContext(LayoutContext);
    const [menuList, setMenuList] = useState<IMenuList[]|undefined>([]);
    const [categoryList, setCategoryList] = useState<ICategoryList[]|null>([])

    useEffect(() => {
       axiosInstance.get(url)
       .then((res: AxiosResponse<IMenuList[], null>
      ) => {
        const data:IMenuList[] | null = res.data;
          console.log(data);
          setMenuList(data);
       }).catch((err) => {
           console.log(err)
       })
    }, [])

     useEffect(() => {
       axiosInstance.get(`${server}/category`)
       .then((res: AxiosResponse<ICategoryList[], null>
      ) => {
        const data:ICategoryList[] | null = res.data;
         console.log(data);
          setCategoryList(data);
       }).catch((err) => {
           console.log(err)
       })
    }, [])

    const tableItemDelete =  (record) => {
            
         axiosInstance.delete(`${server}/menu/${record.id}`)
         .then(() => {
              if(menuList && menuList.length > 0) {
                const data:IMenuList[] = menuList.filter((menu) => menu.id !== record.id);
              setMenuList(data);
              message.success('Menu Item deleted!')
              }

         }).catch(() => {
            message.error('Deleting failed!')
         })
    }

    const columns = [
      {
        title: 'Menu Name',
        dataIndex: 'heading',
        key: 'heading',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => (
           <div>{text}</div>
        )
       
      },
      {
       title: "View",
       key: 'view',
       render: ( record) => (
         <button 
         className="px-2 py-1 rounded-2xl border-2 border-primarylight hover:text-[#EC1C24]"
         onClick={() => {
            console.log('eh')
            layoutContextData?.setTopSheetContent(
              <MenuListEdit
                categoryList={categoryList}
                menuList={menuList}
                setMenuList={setMenuList}
                method="PUT"
                updateData={menuList?.find((data) => data.id == record.id)}
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
           className="px-2 py-1 border-2 hover:text-[#EC1C24] border-primarylight rounded-2xl"
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
            layoutContextData?.setTopSheetContent(<MenuListEdit menuList={menuList} setMenuList={setMenuList} categoryList={categoryList} method="POST" url={url} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add Menu
        </button>
                <Table
                 className="custom-table"
                 style={{ background: 'black'}}
                 dataSource={menuList}
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';
                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default MenuList;