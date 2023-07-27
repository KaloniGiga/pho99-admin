/* eslint-disable @typescript-eslint/no-misused-promises */
import { message } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, createAuthContextProps } from "../../context/AuthContext";
import { axiosInstance } from "../../http";


const AdminLogin = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContextData = useContext<createAuthContextProps | null>(AuthContext);

  useEffect(() => {
    if (authContextData?.adminAuthUser) {
      console.log(authContextData?.adminAuthUser)
      navigate("/admin");
    }
  }, [authContextData?.adminAuthUser]);

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!password || !email) {
      return message.error("Please enter all the values!");
    }
    
      axiosInstance.post(`/authentication/login-admin`,
       {
         username: email,
         password: password
      }).then((response) => {
         const user = response.data;
         authContextData?.setAdminAuthUser(user);
         message.success('Login success');
      }).catch(() => {
          message.error('Login failed! Please try again.');
      })
     
  };

  return (
    <div
      className="bg-primarylight"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-[40%] h-[55%] 2xl:h-[400px] py-8 px-8 border-2 border-mainred rounded-xl bg-primary">
          <form className="">
            <div className="text-white text-2xl text-center font-semibold mb-4 text-uppercase">ADMIN LOGIN</div>
            <div className="">
              <div className="">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%" }}
                  className="w-full outline-none py-2 px-4 my-4 mx-2 rounded-md "
                />
              </div>
              <div className="">
                <input
                  type="password"
                  className="w-full outline-none py-2 px-4 my-4 mx-2 rounded-md "
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </form>
          <div className="w-full">
            <button
              className="text-white text-center w-full text-xl my-4 py-2 bg-mainred mx-2 rounded-md"
              onClick={(e) => onLogin(e)}
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
