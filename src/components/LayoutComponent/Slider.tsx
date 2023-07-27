import React, {useState} from 'react'
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
import type { MenuProps } from 'antd';
import { MailOutlined, AppstoreOutlined, PieChartOutlined, AntDesignOutlined, ScheduleOutlined, ReadOutlined, FileSearchOutlined, AimOutlined, InsertRowBelowOutlined, MinusOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { BsAppIndicator } from 'react-icons/bs';


type MenuItem = Required<MenuProps>['items'][number];
interface SliderProps {
    collapsed: boolean,
    setCollapsed:  React.Dispatch<React.SetStateAction<boolean>>
}

function SliderNav(props: SliderProps) {
 
  const isTablet = useMediaQuery({
    query: '(max-width: 992px)',
  })
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

//   useEffect(() => {

//     if(pathname.split('/')[2] == "") {
//         setSelectedMenu("dashboard");
//     }else {
//         setSelectedMenu(pathname.split('/')[2]);
//     }
//   }, [pathname])

function getItem(
  label: React.ReactNode,
   key: React.Key,
   icon?: React.ReactNode,
   children?: MenuItem[],
   type?: 'group'
   ): MenuItem {
  return {
     key,
     icon,
     children,
     label,
      type
  } as MenuItem;
}

const items: MenuProps['items'] = [
   getItem(
   <Link to='/admin'>Dashboard</Link>,
    'dashboard',
    <PieChartOutlined />
    ),
   getItem(
     <Link to="/addpopUp">Ad PopUp</Link>,
     'popup',
      <AntDesignOutlined />
   ),

  getItem(
      <Link to="/hero">Home Page</Link>, "hero", <AppstoreAddOutlined/>, 
   ),
   getItem(
      <Link to="/our-story">Our Story</Link>, "our-story", <BsAppIndicator />
   ),
   getItem(
     "Menu", "category", <InsertRowBelowOutlined />, [
       getItem(
        <Link to={`/menu-details`}>Menu Page Content</Link>,
        "menu-details",
        <InsertRowBelowOutlined />
      ),
       getItem(
        <Link to={`/menu-list`}>Menu Page Image</Link>,
        "menu-list",
        <InsertRowBelowOutlined />
      ),
      getItem(
        <Link to={`/category-list`}>Menu Category</Link>,
        "category-list",
        <InsertRowBelowOutlined />
      )
     ]
   ),
   getItem(
      "Location", 'location', <AimOutlined />, [
        getItem(
          <Link to={`/location-details`}>Location Page Content</Link>,
          "location-details",
          <AntDesignOutlined />
        ),
        getItem(
          <Link to={`/location-list`}>Location List</Link>,
          "location-list",
          <AimOutlined />
        )
      ]
   ),
    getItem(
    "Gallery", "gallery", <FileSearchOutlined />, [
          getItem(
          <Link to={`/gallery-details`}>Gallery Page Content</Link>,
          "gallery-details",
          <AntDesignOutlined />
        ),
      getItem(
        <Link to={`/gallery-list`}>Gallery List</Link>,
        "gallery-list",
        <FileSearchOutlined />
      )
    ]
   ),
     getItem(
     "Vacancy", "vacancy", <AppstoreOutlined />, [
          getItem(
          <Link to={`/vacancy-details`}>Vacancy Page Content</Link>,
          "vacancy-details",
          <AntDesignOutlined />
        ),
       getItem(
         <Link to={`/vacancy-list`}>Vacancy List</Link>,
         "vacancy-list",
        <AppstoreOutlined />
       )
     ]
   ),
      getItem(
    "News", "news", <ReadOutlined />, [
          getItem(
          <Link to={`/news-details`}>News Page Content</Link>,
          "news-details",
          <AntDesignOutlined />
        ),
      getItem(
        <Link to={`/news-list`}>News List</Link>,
        "news-list",
        <ReadOutlined />
      )
    ]
   ),
   getItem(
    "Contact Page", "contact", <MailOutlined />, [
      // getItem(
      //   <Link to={`/contact-message`}>Contact Message</Link>,
      //   "contact-message",
      //   <ScheduleOutlined />
      // ),
      getItem(
        <Link to={`/contact-list`}>Contact Address List</Link>,
        "contact-list",
        <MailOutlined />
      )
    ]
   ),
  //  getItem(
  //   "Menu", "menu", <MailOutlined />, [
  //      getItem(
  //       <Link to={`menu-list`}>Menu List</Link>,
  //       "menu-list",
  //       <MailOutlined />
  //      )
  //   ]
  //  )
 ]

  return (
    <div className={`z-40 ${props.collapsed ? 'w-[5vw]' : 'w-[20vw]'} pt-8 fixed h-[92vh] left-0 bottom-0  bg-primarylight`}>
      <Sider
       className={`w-[70px] ${props.collapsed ? '!w-[5vw]' : 'lg:!w-[5vw] !max-w-[20vw]'}`}
       trigger={null}
       collapsible
       collapsed={props.collapsed}
       collapsedWidth={isTablet ? 0 : 60}
      >
       {/* <div>
          <img src={logo} alt="" />
       </div> */}
       <Menu
        theme='dark'
        mode='inline'
        className={`myScrollbar h-[90vh] ${props.collapsed ? "w-[5vw]" : 'w-[20vw]'} overflow-y-auto bg-primarylight`}
        onClick={(e) => {
          setSelectedMenu(e.key)
           if(isTablet) {
             props.setCollapsed(true)
           }
         }}
         defaultSelectedKeys={[selectedMenu]}
         selectedKeys={[selectedMenu]}
         items={items}
        />
      </Sider>

    </div>
  )
}

export default SliderNav