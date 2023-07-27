import { ReactNode, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/LayoutComponent/Header';
import LayoutBody from '../components/LayoutComponent/LayoutBody';
import SliderNav from '../components/LayoutComponent/Slider';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PrivateLayoutProps {
  children: ReactNode,
}

function PrivateLayout({children}:PrivateLayoutProps) {

  const isTablet = useMediaQuery({
      query: '(max-width: 992px)',
    });
  const [collapsed, setCollapsed] = useState(isTablet ? true : false);
  const navigate = useNavigate();
   
  const [adminAuthUser, loading] = useAuth();

  useEffect(() => {
   if(!loading && !adminAuthUser) {
      navigate('/login')
   }
    }, [loading, adminAuthUser])

   if(loading) {
      return <div>Loading...</div>
   }

  

  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <SliderNav collapsed={collapsed} setCollapsed={setCollapsed} />
       <div className={`z-10 ml-auto mt-[8vh] ${collapsed ? 'w-[95vw]' : 'w-[80vw]'} h-[92vh] overflow-hidden`}>
          <LayoutBody>
             {children}
          </LayoutBody>
       </div>
    
    </div>
  )
}

export default PrivateLayout;