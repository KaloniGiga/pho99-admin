// import React, { useEffect, useState } from "react";
// import { Upload, message, Image } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import { server } from "../../utils/fetch";


// interface ImagePopupProps {
//     myImage: string,
//     setMyImage: React.Dispatch<React.SetStateAction<string>>,
//     visible: boolean,
//     setVisible:  React.Dispatch<React.SetStateAction<boolean>>,
//     name: string,
//     dataValues: object,
//     multiple: boolean,
// }
// const ImagePopup = (props:ImagePopupProps) => {
//   const { Dragger } = Upload;
//   const {
//     setMyImage,
//     setVisible,
//     name,
//     dataValues,
//     multiple,
//   } = props;

//   const [imageFetching, setImageFetching] = useState(false);
//   const [imageData, setImageData] = useState([]);
//   const [mySelected, setMySelected] = useState(null);
//   const [mySelectedMultiple, setMySelectedMultiple] = useState([]);
//   console.log(name);

//   const uploadProps = {
//     name: "file",
//     multiple: true,
//     action: `${server}/imageUpload/addImage`,
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
         
//       }
//       if (status === "done") {
//         setImageFetching(true);
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
       
//     },
//   };
//   useEffect(() => {
//     fetch(`${server}/imageUpload`, {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setImageData(data.data);
//         setImageFetching(false);
//       });

//     return () => {};
//   }, [imageFetching]);
//   return (
//     <div className="image-popup-container">
//       <div className="image-selection">
//         <div className="selection-title">Drag or click to update the image</div>
//         <Dragger {...uploadProps}>
//           <p className="ant-upload-drag-icon">
//             <InboxOutlined />
//           </p>
//           <p className="ant-upload-text">
//             Click or drag file to this area to upload
//           </p>
//         </Dragger>
//       </div>
//       <div className="image-right ">
//         <div className="image-display myScrollbar">
//           {imageData.map((input, index) => {
//             let tick = false;
//             mySelectedMultiple.map((msp) => {
//               if (msp.id == input.id) {
//                 tick = true;
//               }
//             });
//             return (
//               <div
//               key={index}
//                 className="image-display-box"
//                 onClick={() => {
//                   if (multiple) {
//                     let newTick = false;
//                     mySelectedMultiple.map((msp) => {
//                       if (msp.id == input.id) {
//                         newTick = true;
//                       }
//                     });
//                     if (newTick) {
//                       for (let i = 0; i < mySelectedMultiple.length; i++) {
//                         if (mySelectedMultiple[i].id === input.id) {
//                           let c = mySelectedMultiple;
//                           c.splice(i, 1);
//                           setMySelectedMultiple((prev) => [...c]);
//                         }
//                       }
//                     } else {
//                       setMySelectedMultiple((prev) => [...prev, input]);
//                     }
//                   } else {
//                     if (mySelected?.id == input.id) {
//                       setMySelected("");
//                     } else {
//                       setMySelected(input);
//                     }
//                   }
//                 }}
//               >
//                 <img src={`${server}/${input.image}`} alt="" />
//                 <div
//                   className="image-display-box-overlay"
//                   style={{
//                     display: multiple
//                       ? tick
//                         ? "flex"
//                         : "none"
//                       : input.id == mySelected?.id
//                       ? "flex"
//                       : "none",
//                   }}
//                 ></div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="image-popup-button-container">
//           {mySelected || mySelectedMultiple.length > 0 ? (
//             <button
//               className="np-admin-main-button"
//               onClick={() => {
//                 if (multiple) {
//                   let newArr = mySelectedMultiple.map((msp) => msp.image);
//                   setMyImage({ ...dataValues, [name]: [...newArr] });
//                 } else {
//                   setMyImage({ ...dataValues, [name]: mySelected.image });
//                 }
//                 setVisible(false);
//               }}
//             >
//               Select Image
//             </button>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImagePopup;
