// import { Image, Modal } from "antd";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { server } from "../../utils/fetch";
// import ImagePopup from "../ImagePopup/ImagePopup";

// const ImagePopupModal = (props) => {
//   const {
//     visible,
//     setVisible,
//     myImage,
//     setMyImage,
//     name,
//     dataValues,
//     heading,
//   } = props;
//   const [displayImage, setDisplayImage] = useState("");
//   const [multipleDisplay, setMultipleDisplay] = useState([]);
//   useEffect(() => {
//     setDisplayImage(myImage);
//   }, [myImage]);
//   useEffect(() => {
//     if (myImage && props.multiple) {
//       setMultipleDisplay(myImage);
//     }
//   }, [myImage, props.multiple]);
//   console.log(name);
//   return (
//     <div>
//       <Modal
//         centered
//         open={visible}
//         footer={false}
//         destroyOnClose
//         onOk={() => setVisible(false)}
//         onCancel={() => setVisible(false)}
//         width={1000}
//         bodyStyle={{ padding: "40px" }}
//         className='protected-image-modal'
//       >
//         <ImagePopup
//           myImage={myImage}
//           setMyImage={setMyImage}
//           visible={visible}
//           name={name}
//           setVisible={setVisible}
//           dataValues={dataValues}
//           setDisplayImage={setDisplayImage}
//           multiple={props.multiple ? props.multiple : null}
//         />
//       </Modal>
//       <div className="image-select-title" style={{ marginTop: "20px" }}>
//         {heading}
//       </div>
//       <div className="image-click-display-container">
//         <div className="image-click-box" onClick={() => setVisible(true)}>
//           +
//         </div>
//         {props.multiple ? (
//           <div className="image-display-on-click" style={{ width: "auto" }}>
//             {multipleDisplay.map((mul, index) => {
//               return (
//                 <Image
//                   src={`${server}/${mul}`}
//                   width={"100%"}
//                   height={"100%"}
//                   style={{ objectFit: "cover", marginRight: "10px" }}
//                 />
//               );
//             })}
//           </div>
//         ) : (
//           <div className="image-display-on-click">
//             {displayImage ? (
//               <Image
//                 src={`${server}/${displayImage}`}
//                 width={"100%"}
//                 height={"100%"}
//                 style={{ objectFit: "cover" }}
//               />
//             ) : null}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImagePopupModal;
