import { useContext, useState, useEffect } from "react";
import { AuthContext, createAuthContextProps } from "../context/AuthContext";
import { axiosInstance } from "../http";

export function useAuth() {
    const [loading, setLoading] = useState(true);
    const authContextData = useContext<createAuthContextProps|null>(AuthContext);
    // if(!authContextData) return null;
    const { adminAuthUser, setAdminAuthUser } = authContextData || {}
    const controller = new AbortController();

   useEffect(() => {
      axiosInstance.get('/authentication', { withCredentials: true })
      .then(({data}) => {
        if(setAdminAuthUser) {
           console.log(data);
         setAdminAuthUser(data);
         }
        setTimeout(() => setLoading(false), 1000); 
      }).catch(() => {
        setTimeout(() => setLoading(false), 1000);
      })

      return () => {
         controller.abort();
      }
    }, [])

    return [adminAuthUser, loading];
}