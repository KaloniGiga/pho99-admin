// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import "./login.css";
// import { server } from "../../utils/fetch";
// import { Form, Input, Button, Checkbox, message } from "antd";
// const ResetPassword = (props) => {
//   const dispatch = useDispatch();

//   const { id, token } = props.match.params;
//   const [passwordChanged, setPasswordChanged] = useState(false);

//   const onFinish = async (values) => {
//     const key = "updatable";
//     values = {
//       ...values,
//       id: id,
//       token: token,
//     };

//     message.loading({ content: "Loading...", key });
//     try {
//       const res = await fetch(`${server}/auth/resetPassword`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       const data = await res.json();
       
//       if (data) {
//         message.success({ content: data.message, key, duration: 2 });
//       }
//       if (res.status === 200) {
//         setPasswordChanged(true);
//       }
//     } catch (error) {
       
//       message.error({ content: "The operation failed", key, duration: 2 });
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     message.error({
//       content: "The operation failed " + errorInfo,
//       duration: 2,
//     });
//   };

//   return (
//     <div className="LoginWrapper">
//       <div className="LoginBox row">
//         {passwordChanged ? (
//           <div className="col-md-12">
//             {" "}
//             <h3>Your password has been updated</h3>
//           </div>
//         ) : (
//           <div className="col-md-12">
//             <h2>Enter Your New Password</h2>
//             <Form
//               name="basic"
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               layout="vertical"
//               onFinishFailed={onFinishFailed}
//             >
//               <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your password!",
//                   },
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 name="confirm"
//                 label="Confirm Password"
//                 dependencies={["password"]}
//                 hasFeedback
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please confirm your password!",
//                   },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue("password") === value) {
//                         return Promise.resolve();
//                       }

//                       return Promise.reject(
//                         new Error(
//                           "The two passwords that you entered do not match!"
//                         )
//                       );
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>

//               <Form.Item>
//                 <Button className="buttonReverse" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
