import React from 'react'
import Analytics from '../components/Analytics/Analytics'

export interface AnalyticsData {
  icon: React.ReactNode,
  title: string,
  data: string | number | null | undefined,
  background: string
}
function Dashboard() {

  // const dashboardAnalyticsData:AnalyticsData[] = [
  //   {
  //     icon: '',
  //     title: '',
  //     data: 0,
  //     background: 'blue'
  //   }
  // ]
  return (
    <div className=''>
      <div>
        {/* <div>
           {dashboardAnalyticsData.map((data) => {
             return (
                <div>
                   <AnalyticsBox items={data} />
                </div>
             )
           })

           }
        </div> */}
        <Analytics />
      </div>
    </div>
  )
}

export default Dashboard