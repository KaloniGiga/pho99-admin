import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../http';
import { server } from '../../utils/fetch';
import { Table, message } from 'antd';
import { AxiosResponse } from 'axios';
import { LayoutContext } from '../../context/LayoutContext';
import NewsListEdit from './NewsListEdit';
import { AuthContext } from '../../context/AuthContext';

export interface INewsList {
  id: number;
  heading: string;
  mainContent: string;
  author: string;
  publishedDate: string;
  fileName: string;
  path: string;
  link: string;
}

function NewsList() {
    const url = `${server}/news`;
    const layoutContextData = useContext(LayoutContext);
    const authContextData = useContext(AuthContext);
    const {setNews} = authContextData || {};
    const [newsList, setNewsList] = useState<INewsList[]|undefined>([]);

    useEffect(() => {
     
       axiosInstance.get(`${server}/news/fetch`)
       .then((res: AxiosResponse<INewsList[], null>
      ) => {
        const data:INewsList[] | null = res.data;
         console.log(data);
          setNewsList(data);
          if(setNews) {
            setNews(data)
          }
       }).catch((err) => {
           console.log(err)
       })

    }, [])

    const tableItemDelete =  (record) => {
             
         axiosInstance.delete(`${server}/news/${record.id}`)
         .then(() => {
            if(newsList && newsList.length > 0) {
             const data:INewsList[] =  newsList.filter((news) => news.id !== record.id)
             setNewsList(data);    
             if(setNews) {
               setNews(data);
             }
             message.success('News Item Deleted!');
            }
         }).catch(() => {
            message.error('Deleting failed!')
         })
 
    }

    const columns = [
      {
        title: 'News Title',
        dataIndex: 'heading',
        key: 'title',
        render: (text) => (
            <div>{text}</div>
        )
      },
      {
        title: 'Author',
        dataIndex: 'author',
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
              <NewsListEdit
                newsList={newsList}
                setNewsList={setNewsList}
                method="PUT"
                updateData={newsList?.find((data) => data.id == record.id)}
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
            layoutContextData?.setTopSheetContent(<NewsListEdit newsList={newsList} method="POST" url={url} setNewsList={setNewsList} />);
            layoutContextData?.setTopSheet(true);
           }}
          >
          Add News
        </button>
                <Table
                 className="custom-table"
                 style={{ background: 'black'}}
                 dataSource={newsList}
                 
                //  rowClassName={(record, index) => {
                //     return record.seen == "false" ? 'set-unseen-row' : '';

                //  }}
                 columns={columns}
                />
            </div>
        </div>
    )
}

export default NewsList