import {useState, useEffect, useContext} from 'react';
import { server } from '../../utils/fetch';
import { LayoutContext } from '../../context/LayoutContext';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../http';
import { Table, message } from 'antd';
import CategoryListEdit from './CategoryListEdit';

export interface ICategoryImage {
  id: number,
  fileName: string,
  path: string,
  originalFileName: string,
}
export interface ICategoryList {
  id: number,
  heading: string,
  subHeading: string,
  categoryImage: ICategoryImage[],
}

function CategoryList() {

   const url = `${server}/category`;
    const layoutContextData = useContext(LayoutContext);
    const [categoryList, setCategoryList] = useState<ICategoryList[]|undefined>([]);


    useEffect(() => {
       axiosInstance.get(url)
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
         axiosInstance.delete(`${server}/category/${record.id}`)
         .then(() => {
            if(categoryList && categoryList.length > 0) {
              const data:ICategoryList[] = categoryList.filter((category) => category.id !== record.id);
             setCategoryList(data);
             message.success('Category Item Deleted!');
            }
         }).catch(() => {
            message.error('Deleting failed!')
         })
    }

    const columns = [
      {
        title: 'Category Name',
        dataIndex: 'heading',
        key: 'heading',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Description',
        dataIndex: 'subHeading',
        key: 'subHeading',
        render: (text) => (
           <div className='line-clamp-1'>{text}</div>
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
              <CategoryListEdit
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                method="PUT"
                updateData={categoryList?.find((data) => data.id == record.id)}
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
            layoutContextData?.setTopSheetContent(<CategoryListEdit categoryList={categoryList} setCategoryList={setCategoryList} method="POST" url={url} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add Category
        </button>
                <Table
                 className="custom-table"
                 dataSource={categoryList}
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';

                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default CategoryList;