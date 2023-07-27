import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineSolution, AiFillExperiment } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
import WorldMap from '../WorldMap/WorldMap';
import AnalyticsBox from './AnalyticsBox';
import DeviceChart from './DeviceChart';
import SourceChart from './SourceChart';
import { BsNewspaper } from 'react-icons/bs';
import { MdOutlineTimer } from 'react-icons/md';
import { FaPeopleGroup, FaPersonRunning } from 'react-icons/fa6';
import { axiosInstance } from '../../http';
import { IContactMessage } from '../../Pages/ContactMessage/ContactMessage';
import { AxiosResponse } from 'axios';
import { IVacancyList } from '../../Pages/VacancyList/VacancyList';
import { INewsList } from '../../Pages/NewsList/NewsList';


interface AnalyticsData {
  icon: React.ReactNode,
  title: string,
  id?: string,
  data: number | null | 0 | undefined | string,
  background: string
}
function Analytics() {

    const authContextData = useContext(AuthContext);
    const {
     activeUsers,
     setActiveUsers,
     sessionDuration,
     setSessionDuration,
     bounceRate,
     setBounceRate,
     sessionPerUser,
     setSessionPerUser,
    //  trafficSource,
     setTrafficSource,
    //  sessionsByDevice,
     setSessionsByDevice,
    //  countryBasedUser,
     setCountryBasedUser,
    //  pageViews,
    //  setPageViews,
     contactMessage,
     setContactMessage,
     news,
     setNews,
     jobs,
     setJobs
    } = authContextData || {}

      useEffect(() => {
       axiosInstance.get(`/contact-message`)
       .then((res: AxiosResponse<IContactMessage[], null>
      ) => {
        const data:IContactMessage[] | null = res.data;
         console.log(data);
         if(setContactMessage) {
           setContactMessage(data);
         }
         
       }).catch((err) => {
           console.log(err)
       })
    }, [])

   useEffect(() => {
       axiosInstance.get(`/vacancy`)
       .then((res: AxiosResponse<IVacancyList[], null>
      ) => {
        const data:IVacancyList[] | null = res.data; 
          if(setJobs) {
            setJobs(data);
          }
       }).catch((err) => {
           console.log(err)
       })
    }, [])

        useEffect(() => {
     
       axiosInstance.get(`/news/fetch`)
       .then((res: AxiosResponse<INewsList[], null>
      ) => {
        const data:INewsList[] | null = res.data;
         console.log(data);
          
          if(setNews) {
            setNews(data)
          }
       }).catch((err) => {
           console.log(err)
       })

    }, [])
    const [dashboardAnalyticsData, setDashboardAnalyticsData] = useState<AnalyticsData[]>([
        {
            icon: <AiOutlineMail  />,
            title: 'Contacts',
            data: contactMessage ? contactMessage.length : 0,
            background: 'blue'
        },
        {
            icon: <BsNewspaper />,
            title: "News",
            data: news ? news.length : 0,
            background: 'red'
        },
        {
            icon: <AiOutlineSolution />,
            title: 'Vacancy',
            data: jobs ? jobs.length : 0,
            background: 'blue'
        },
         {
      icon: <FaPeopleGroup />,
      title: "Active Users",
      id: "users",
      data: 0,
      background: "blue",
    },
    {
      icon: <FaPersonRunning />,
      title: "Bounce Rate",
      id: "bounce",
      data: "0%",
      background: "red",
    },
    {
      icon: <AiFillExperiment /> ,
      title: "Session Per User",
      id: "sessionPerUser",
      data: 0,
      background: "lightgreen",
    },
    {
      icon: <MdOutlineTimer />,
      title: "Session Duration",
      id: "sessionDuration",
      data: 0,
      background: "orange",
    },
]);

useEffect(() => {
   if(jobs && jobs.length > 0) {
     let cc = dashboardAnalyticsData.map((da) => {
        if (da.title == "Vacancy") {
          console.log(jobs.length);
          return {
            ...da,
            data: jobs.length
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
   }
}, [jobs])

useEffect(() => {
   if(news && news.length > 0) {
     let cc = dashboardAnalyticsData.map((da) => {
        if (da.title == "News") {
          return {
            ...da,
            data: news.length
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
   }
}, [news])

useEffect(() => {
   if(contactMessage && contactMessage.length > 0) {
     let cc = dashboardAnalyticsData.map((da) => {
        if (da.title == "Contacts") {
          return {
            ...da,
            data: contactMessage.length
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
   }
}, [contactMessage])

  useEffect(() => {
    if (bounceRate && bounceRate.length > 0) {
      let cc = dashboardAnalyticsData.map((da) => {
        if (da.id == "bounce") {
          return {
            ...da,
            data:
              parseFloat(`${bounceRate[0].metricValues[0].value * 100}`).toFixed(2) +
              "%",
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
    }
  }, [bounceRate]);

   useEffect(() => {
    if (activeUsers && activeUsers.length > 0) {
      let cc = dashboardAnalyticsData.map((da) => {
        if (da.id == "users") {
          return { ...da, data: activeUsers[0].metricValues[0].value };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
    }
  }, [activeUsers]);

  useEffect(() => {
    if (sessionPerUser && sessionPerUser.length > 0) {
      let cc = dashboardAnalyticsData.map((da) => {
        if (da.id == "sessionPerUser") {
          return {
            ...da,
            data: parseFloat(sessionPerUser[0].metricValues[0].value).toFixed(
              2
            ),
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
    }
  }, [sessionPerUser]);

  useEffect(() => {
    if (sessionDuration && sessionDuration.length > 0) {
      let cc = dashboardAnalyticsData.map((da) => {
        if (da.id == "sessionDuration") {
          return {
            ...da,
            data: parseFloat(sessionDuration[0].metricValues[0].value).toFixed(
              2
            ),
          };
        }
        return da;
      });
      setDashboardAnalyticsData([...cc]);
    }
  }, [sessionDuration]);

  //fetching analytics data 

  useEffect(() => {
     axiosInstance.get('/analytics/activeUsers').then((res) => {
      if(res?.data && setActiveUsers) {
      setActiveUsers(res.data);
      }
     }).catch((err) => {
       console.log('failed to fetch active user', err);
     })
  }, [])

 

  useEffect(() => {
     axiosInstance.get('/analytics/bounce-rate').then((res) => {
       if(res?.data && setBounceRate) {
         setBounceRate(res.data);
       }
     }).catch((err) => {
        console.log('failed to fetch bounce rate', err);
     })
   }, [])

   useEffect(() => {
     axiosInstance.get('/analytics/averageSession').then((res) => {
       if(res?.data && setSessionDuration) {
         setSessionDuration(res.data);
       }
     }).catch((err) => {
        console.log('failed to fetch session duration', err)
     } )
   }, [])

   useEffect(() => {
     axiosInstance.get('/analytics/user-based-country').then((res) => {
       if(res?.data && setCountryBasedUser) {
         setCountryBasedUser(res.data);
       }
     }).catch((err) => {
       console.log('failed to fetch country based user', err);
     })
   }, [])

   useEffect(() => {
    axiosInstance.get('/analytics/source').then((res) => {
       if(res?.data && setTrafficSource) {
        setTrafficSource(res.data);
       }
    }).catch((err) => {
       console.log('failed to fetch traffic source', err);
    })
   }, [])

   useEffect(() => {
      axiosInstance.get('/analytics/session-per-user').then((res) => {
         if(res?.data && setSessionPerUser) {
           setSessionPerUser(res.data);
         }
      }).catch((err) => {
         console.log('failed to fetch session-per-user', err);
      })
   }, [])
  
   useEffect(() => {
     axiosInstance.get('/analytics/session-by-device').then((res) => {
       if(res?.data && setSessionsByDevice) {
         setSessionsByDevice(res.data);
       }
     }).catch((err) => {
       console.log('failed to fetch session by device', err);
     })
   }, [])

  return (
    <div>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-wrap items-center  gap-2">
          {dashboardAnalyticsData.map((data, index) => {
            return (
              <div key={index} className="lg:basis-[30%] md:basis-[32%] sm:basis-1/2 basis-1/2">
                <AnalyticsBox items={data} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {/* <WorldMap /> */}
          <WorldMap />
          {/* <div className="lg:basis-1">
            <PagesView />
          </div> */}
          <div className="lg:basis-1">
            <DeviceChart />
          </div>
          <div className="lg:basis-1">
            <SourceChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics;