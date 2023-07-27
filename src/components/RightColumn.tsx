import { useContext } from "react";
import { AuthContext, createAuthContextProps } from "../context/AuthContext";


const RightColumn = () => {
  const authContextData= useContext<createAuthContextProps | null>(AuthContext);
  return (
    <div className="basis-0 lg:basis-[30%] h-full px-[20px] overflow-y-hidden mt-8 ">
      <div className="h-[350px] backdrop-blur-[8px] bg-primarylight rounded-lg px-[20px] py-[10px] overflow-y-auto">
        <div className="text-white text-lg mb-[10px]">Recent Contacts</div>
        {authContextData?.contactMessage && authContextData?.contactMessage.map((co:{name: string, message: string}, index) => {
          return (

            <div className="text-white mb-[20px]" key={index}>
              
              <div className="text-[12px] transform-capitalize overflow-hidden line-clamp-1 font-bold">{co.name}</div>
              <div className="text-[12px] overflow-hidden line-clamp-2">{co.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightColumn;