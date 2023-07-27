import { message, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { LayoutContext } from "../../Context/LayoutContext/LayoutContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import InputField from "../../NpComponents/InputField/InputField";
import { fetchContact } from "../../utils/api-calls/contactCalls";

const AdminContactEdit = (props) => {
  const { url } = props;
  const { setTopSheet } = useContext(LayoutContext);

  const { authUser, contact, setForBusiness, setContact } =
    useContext(AuthContext);
  const [dataValues, setDataValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setDataValues({
      name: props.updateData ? props.updateData.name : "",
      phone: props.updateData ? props.updateData.phone : "",
      email: props.updateData ? props.updateData.email : "",
      message: props.updateData ? props.updateData.message : "",
    });
  }, [props.updateData]);
  const addData = async () => {
    if (
      !dataValues.name ||
      !dataValues.phone ||
      !dataValues.email ||
      !dataValues.message
    ) {
      return message.error("Please insert required values!");
    }
    try {
      const res = await fetch(url, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          props.updateData
            ? { ...dataValues, id: props.updateData.id }
            : { ...dataValues }
        ),
      });
      const data = await res.json();
      if (res.status == 200 || res.status == 201) {
        let contactf = await fetchContact();
        setContact(contactf);
        setTopSheet(false);

        return message.success(data.message);
      }

      return message.error(data.message);
    } catch (error) {
      message.error(`${props.updateData ? "Updating" : "Adding"} Failed!`);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="name"
          type="text"
          placeholder="Enter Name..."
          label="Name"
        />

        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="email"
          type="text"
          placeholder="Enter Email..."
          label="Email"
        />
      </div>
      <div style={{ display: "flex" }}>
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="phone"
          type="text"
          placeholder="Enter Phone..."
          label="Phone"
        />
      </div>
      <div style={{ display: "flex" }}>
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="message"
          type="text"
          placeholder="Enter message..."
          label="Message"
          textArea
        />
      </div>

      <button onClick={() => addData()} className="np-admin-main-button">
        {props.method == "POST" ? "Add" : "Update"}
      </button>
    </div>
  );
};

export default AdminContactEdit;
