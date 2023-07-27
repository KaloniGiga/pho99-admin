/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React from "react";
// import "./login.css";
// import { Form, Input, Button, Checkbox, message } from "antd";
// import { server } from "../../utils/fetch";

// const ForgotPassword = () => {
 
//    const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values) => {
//     const key = "updatable";
     
//      message.loading({ content: "Loading...", key });
//     try {
//       const res = await fetch(`${server}/auth/forgotPassword`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       const data = await res.json();
       
//       if (data) {
//        return message.success({ content: data.message, key, duration: 2 });
      
//       }
//     } catch (error) {
//        message.error({ content: "The operation failed", key, duration: 2 });
      
//     }
//   };

//   const onFinishFailed = async (errorInfo: any) => {
//      messageApi.error({ content: errorInfo});
//   };

//   return (
//     <div className="flex justify-center items-center h-[100vh] bg-white">
//       <div className="shadow-md px-[20px] py-[50px] flex justify-center items-center bg-[red] flex-col">
//         <div className="lg:basis-1">
//           <h2 className="text-white">Enter Your Registered Email Id</h2>
//           <Form
//             name="basic"
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             layout="vertical"
//             onFinishFailed={onFinishFailed}
//           >
//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your email!",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item>
//               <Button className="bg-black text-white border-[2px] border-black px-[15px] py-[15px] cursor-pointer h-auto w-auto text-bold text-[16px]" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
