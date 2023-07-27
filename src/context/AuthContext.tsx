/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { INewsList } from "../Pages/NewsList/NewsList";
import { IContactMessage } from "../Pages/ContactMessage/ContactMessage";
import { IContactList } from "../Pages/ContactList/ContactList";
import { IVacancyList } from "../Pages/VacancyList/VacancyList";
import { ILocationList } from "../Pages/LocationList/LocationList";
import { ICategoryList } from "../Pages/Category/CategoryList";
import { IMenuList } from "../Pages/MenuList/MenuList";

export interface AuthProviderProps {
    children: React.ReactNode,
}

export interface sessionsByDeviceType {
    dimensionValues: { value: string}[]
    metricValues: { value: string}[]
}

export interface bounceRateType {
  dimensionValues: { value: string}[]
  metricValues: {value: number}[]
}

export interface createAuthContextProps {
    adminAuthUser: object | null,
    setAdminAuthUser: React.Dispatch<React.SetStateAction<object | null>>,
    adminAccessToken: string|null,
    setAdminAccessToken: React.Dispatch<React.SetStateAction<string|null>>,
    adminRefreshToken: string|null,
    setAdminRefreshToken: React.Dispatch<React.SetStateAction<string|null>>,
    contactMessage: IContactMessage[] | null,
    setContactMessage: React.Dispatch<React.SetStateAction<IContactMessage[]| null>>,
    contactList: IContactList[] | null,
    setContactList: React.Dispatch<React.SetStateAction<IContactList[] | null>>,
    jobs: IVacancyList[]|null,
    setJobs: React.Dispatch<React.SetStateAction<IVacancyList[]| null>>,
    news: INewsList[]|null,
    setNews: React.Dispatch<React.SetStateAction<INewsList[]| null>>,
    location: ILocationList[]|null,
    setLocation: React.Dispatch<React.SetStateAction<ILocationList[] | null>>,
    category: ICategoryList[] | null,
    setCategory: React.Dispatch<React.SetStateAction<ICategoryList[] | null>>,
    menu: IMenuList[] | null,
    setMenu: React.Dispatch<React.SetStateAction<IMenuList[] | null>>
    activeUsers: sessionsByDeviceType[]|null,
    setActiveUsers: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    averageSession: sessionsByDeviceType[]|null,
    setAverageSession: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    sessionDuration: sessionsByDeviceType[] | null,
    setSessionDuration: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    bounceRate: bounceRateType[] | null,
    setBounceRate: React.Dispatch<React.SetStateAction<bounceRateType[]|null>>,
    sessionPerUser: sessionsByDeviceType[] | null,
    setSessionPerUser: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    trafficSource: sessionsByDeviceType[] | null,
    setTrafficSource: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    sessionsByDevice: sessionsByDeviceType[] | null,
    setSessionsByDevice: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    countryBasedUser: sessionsByDeviceType[] | null,
    setCountryBasedUser: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    user: [] | null,
    setUser: React.Dispatch<React.SetStateAction<[]|null>>,
    pageViews: sessionsByDeviceType[] | null,
    setPageViews: React.Dispatch<React.SetStateAction<sessionsByDeviceType[]|null>>,
    // googleClientID: string | null,
    // setGoogleClientID: React.Dispatch<React.SetStateAction<[]|null>>,
    secret: string,
    setSecret: React.Dispatch<React.SetStateAction<string>>,
    adPopUp: string | null,
    setAdPopUp: React.Dispatch<React.SetStateAction<string | null>>
}

export const AuthContext = React.createContext<createAuthContextProps | null>(null);



const AuthProvider = ({ children }: AuthProviderProps) => {

  const [adminAuthUser, setAdminAuthUser] = useState<object|null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [adminAccessToken, setAdminAccessToken] = useState<string|null>(null);
  const [adminRefreshToken, setAdminRefreshToken] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState<IContactMessage[]|null>(null);
  const [contactList, setContactList] = useState<IContactList[]|null>(null);
  const [jobs, setJobs] = useState<IVacancyList[]|null>(null);
  const [news, setNews] = useState<INewsList[]|null>(null);
  const [location, setLocation] = useState<ILocationList[] | null>(null);
  const [category, setCategory] =  useState<ICategoryList[] | null>(null);
  const [menu, setMenu] = useState<IMenuList[] | null>(null);
  const [adPopUp, setAdPopUp] = useState<string | null>(null);
  const [averageSession, setAverageSession] = useState<sessionsByDeviceType[]|null>(null)
  const [activeUsers, setActiveUsers] = useState<sessionsByDeviceType[]|null>(null);
  const [sessionDuration, setSessionDuration] = useState<sessionsByDeviceType[]|null>(null);
  const [bounceRate, setBounceRate] = useState<bounceRateType[]|null>(null);
  const [sessionPerUser, setSessionPerUser] = useState<sessionsByDeviceType[]|null>(null);
  const [trafficSource, setTrafficSource] = useState<sessionsByDeviceType[]|null>(null);
  const [sessionsByDevice, setSessionsByDevice] = useState<sessionsByDeviceType[]|null>(null);
  const [countryBasedUser, setCountryBasedUser] = useState<sessionsByDeviceType[]|null>(null);
  const [user, setUser] = useState<[]|null>(null);
  const [pageViews, setPageViews] = useState<sessionsByDeviceType[]|null>(null);
  const [secret, setSecret] = useState("alohomora");
  // const [googleClientID, setGoogleClientID] = useState("826748649497-68hvurd49v9260rfhrk0edn91mv9i721.apps.googleusercontent.com")

  const setAdminLogout = () => {
    setAdminAuthUser(null);
  }
  
  const providerValue = {
    setAdminLogout,
    // googleClientID,
    // setGoogleClientID,
    user,
    setUser,
    activeUsers,
    setActiveUsers,
    sessionDuration,
    averageSession,
    setAverageSession,
    setSessionDuration,
    bounceRate,
    setBounceRate,
    sessionPerUser,
    setSessionPerUser,
    trafficSource,
    setTrafficSource,
    sessionsByDevice,
    setSessionsByDevice,
    countryBasedUser,
    setCountryBasedUser,
    pageViews,
    setPageViews,
    secret,
    setSecret,
    adminAuthUser,
    setAdminAuthUser,
    adminAccessToken,
    setAdminAccessToken,
    adminRefreshToken,
    setAdminRefreshToken,
    contactMessage,
    setContactMessage,
    contactList,
    setContactList,
    jobs,
    setJobs,
    news,
    setNews,
    adPopUp,
    setAdPopUp,
    location,
    setLocation,
    category,
    setCategory,
    menu,
    setMenu,
  };


  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
