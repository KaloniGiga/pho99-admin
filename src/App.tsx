import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import PrivateLayout from './layout/PrivateLayout';
import Dashboard from './Pages/Dashboard';
import AddPopup from './Pages/AddPopup';
import ContactMessage from './Pages/ContactMessage/ContactMessage';
import ContactList from './Pages/ContactList/ContactList';
import VacancyList from './Pages/VacancyList/VacancyList'
import NewsList from './Pages/NewsList/NewsList';
import GalleryList from './Pages/GalleryList/GalleryList';
import LocationList from './Pages/LocationList/LocationList';
import CategoryList from './Pages/Category/CategoryList';
import MenuList from './Pages/MenuList/MenuList';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import HomePage from './Pages/Home/HomePage';
import MenuDetails from './Pages/MenuDetails/menuDetails';
import LocationDetails from './Pages/LocationDetails/LocationDetails';
import GalleryDetails from './Pages/GalleryDetails/GalleryDetails';
import VacancyDetails from './Pages/VacancyDetails/VacancyDetails';
import NewsDetails from './Pages/NewsDetails/NewsDetails';
import OurStory from './Pages/OurStory/OurStory';

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <AdminLogin />,
    },
     {
      path: '/',
      element: (
         <PrivateLayout>
          <Outlet />
         </PrivateLayout>
      ),
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/admin',
          element: <Dashboard />
        },
        {
          path: '/addpopup',
          element: <AddPopup />
        },
        {
          path: '/hero', 
          element: <HomePage />
        },
        {
         path: '/gallery-details',
         element: <GalleryDetails />
        },
        {
         path: '/vacancy-details',
         element: <VacancyDetails />,
        },
        {
          path: '/news-details',
          element: <NewsDetails />,
        },
        {
          path: '/contact-message',
          element: <ContactMessage />
        },
        {
          path: '/contact-list',
          element: <ContactList />
        },
        {
          path: '/vacancy-list',
          element: <VacancyList />
        },
        {
          path: '/menu-details',
          element: <MenuDetails />,
        },
        {
          path: '/news-list',
          element: <NewsList />
        },
        {
          path: '/gallery-list',
          element: <GalleryList />
        },
        {
          path: '/location-details',
          element: <LocationDetails />
        },
        {
          path: '/location-list',
          element: <LocationList />
        },
        {
          path: '/category-list',
          element: <CategoryList />,
        },
        {
          path: '/menu-list',
          element: <MenuList />,
        },
        {
          path: '/our-story',
          element: <OurStory />
        }
        
      ]
     }
  ])

  return <RouterProvider router={router} />
}

export default App
