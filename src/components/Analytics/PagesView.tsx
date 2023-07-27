import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext, createAuthContextProps } from "../../context/AuthContext";

type myPageType = {
  page: any, 
  views: any,
}

const PagesView = () => {
  const authContextData = useContext<createAuthContextProps|null>(AuthContext);
  const [myViews, setMyViews] = useState<myPageType[]>([]);
  // console.log(pageViews, "pageViews")
  useEffect(() => {
    if (authContextData?.pageViews && authContextData.pageViews.length > 0) {
      const newArr = authContextData?.pageViews.map((pg) => {
        return {
          page: pg.dimensionValues[0].value,
          views: pg.metricValues[0].value,
        };
      });
      setMyViews([...newArr]);
    }
  }, [authContextData?.pageViews, authContextData?.pageViews?.length]);
  const columns = [
    {
      title: "Page Name",
      dataIndex: "page",
      key: "page",
      render: (text) => (
        <div className="category-table-name">{text}</div>
      ),
    },

    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
  ];
  return (
    <div>
      <Table
        dataSource={myViews}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default PagesView;
