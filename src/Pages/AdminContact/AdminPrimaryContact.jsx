
import React, { useContext, useEffect, useState } from "react";
import { Image, message, Modal } from "antd";
import InputField from "../../NpComponents/InputField/InputField";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { server } from "../../utils/fetch";
import { fetchPrimaryContact } from "../../utils/api-calls/contactCalls";

const AdminPrimaryContact = () => {

  let url = `${server}/contact/primary-contact`;
  const { authUser, primaryContact, setPrimaryContact } = useContext(AuthContext);
  const [insertPrimaryContact, setInsertPrimaryContact] = useState(false);

  const [dataValues, setDataValues] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (primaryContact) {
      setDataValues({
        email: primaryContact.email,
        phone: primaryContact.phone,
        address: primaryContact.address,
      });
    }
    
  }, [primaryContact]);

  const updateDatabase = async () => {
    try {
        console.log(insertPrimaryContact);
        console.log(dataValues);
        
      const res = await fetch(url, {
        method: `${!primaryContact ? 'POST' : 'PUT' }`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataValues),
      });

      const data = await res.json();
      console.log(data);

      if (res.status == 200 || res.status == 201) {
        let primaryContactf = await fetchPrimaryContact();
        setPrimaryContact(primaryContactf);
        return message.success(data.message);
      }

      return message.error(data.message);
    } catch (error) {
      message.error(`${!primaryContact ? "Adding Failed!" : "Updating Failed" }`);
    }
  };

  return (
    <div className="admin-landing-hero">
      <div className="main-banner">
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="email"
          type="text"
          placeholder="Enter contact email..."
          label="Email"
        />
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="phone"
          type="text"
          placeholder="Enter contact phone..."
          label="Phone"
        />
        <InputField
          inputValue={dataValues}
          setInputValue={setDataValues}
          name="address"
          type="text"
          placeholder="Enter contact address..."
          label="Address"
        />

     
        <button
          className="np-admin-main-button"
          onClick={() => {
            updateDatabase();
          }}
        >
          {`${!primaryContact ? "Add" : 'Update'}`}
        </button>
      </div>
    </div>
  );
};

export default AdminPrimaryContact;