/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import  { useContext, useEffect, useState } from "react";
import { Image} from "antd";
import popUp from '/pho99admin.png';
import UploadAdPopUp from "../components/UploadAdPopUp/UploadAdPopUp";
import { getAdPopUp } from "../utils/adPopUp";
import { AuthContext } from "../context/AuthContext";

const AddPopUp = () => {
 const authContextData = useContext(AuthContext); 
  const [imageUrl] = useState(popUp);
  const [addPop, setAddPop] = useState<string | null>(null);

 useEffect(() => {
    getAdPopUp()
    .then((res) => {
        const data:string = res.data;
        authContextData?.setAdPopUp(data);
        setAddPop(data);
    })
    .catch((error) => {
      console.log(error);
    })
 }, [])

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
       <div className="my-4">
         <Image width={300} src={addPop ? `${import.meta.env.VITE_BASE_URL}/adPopUp/${addPop}` : imageUrl} fallback={popUp} /> 
       </div>
         <UploadAdPopUp setAddPop={setAddPop} />
      </div>
    </div>
  );
};

export default AddPopUp;