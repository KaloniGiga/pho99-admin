import { AnalyticsData } from '../../Pages/Dashboard'

interface AnalyticsBoxProps {
    items: AnalyticsData,
}

function AnalyticsBox(props: AnalyticsBoxProps) {

return (
    <div className="flex h-[100px] !w-full mb-[30px] shadow-md bg-[rgba(0,0,0,0.3)] backdrop-blur-[3px] p-[10px] text-white rounded-xl border-[1px] border-[red]"  >
      <div
        className="w-[120px] max-w-[50%] flex items-center justify-center mr-[5px] text-[32px]"
        // style={{ background: item.background }}
      >
        {props.items.icon}
      </div>
      <div className="flex flex-col justify-center text-[14px] font-semibold ">
        <div className="mb-[10px]">{props.items.title}</div>
        <div className="w-full text-left">{props.items.data}</div>
      </div>
    </div>
  );
}

export default AnalyticsBox