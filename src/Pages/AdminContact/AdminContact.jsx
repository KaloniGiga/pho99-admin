import { Image, message, Table } from "antd";
import React, { useContext, useState } from "react";
import { LayoutContext } from "../../Context/LayoutContext/LayoutContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { server } from "../../utils/fetch";
import { fetchContact } from "../../utils/api-calls/contactCalls";
import AdminContactEdit from "./AdminContactEdit";

const AdminContact = () => {
  let url = `${server}/contact`;
  const { authUser, contact, setContact } = useContext(AuthContext);
  const { topSheet, setTopSheet, setTopSheetContent } =
    useContext(LayoutContext);

  const [selectedData, setSelectedData] = useState({});

  const tableItemEdit = (record) => {};

  const tableItemDelete = async (record) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: record.id }),
      });
      const data = await res.json();
      if (res.status == 200 || res.status == 201) {
        let contactf = await fetchContact();
        setContact(contactf);
        return message.success(data.message);
      }

      return message.error(data.message);
    } catch (error) {
      message.error(`Deleting Failed!`);
    }
  };
  const setSeen = async (record) => {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...record, seen: "true" }),
      });
      const data = await res.json();
      if (res.status == 200 || res.status == 201) {
        let contactf = await fetchContact();
        setContact(contactf);
        
        return;
      }
    } catch (error) {}
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="category-table-name">{text}</div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],

    },

    {
      title: "View",
      key: "view",
      render: (text, record) => (
        <button
          className="np-admin-main-button"
          onClick={() => {
            setSeen(record);

            setTopSheetContent(
              <AdminContactEdit
                method="PUT"
                updateData={contact.find((data) => data.id == record.id)}
                url={url}
              />
            );
            setTopSheet(true);
            tableItemEdit(record);
          }}
        >
          View
        </button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <button
          className="np-admin-main-button"
          onClick={() => tableItemDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="admin-store-category">
      <div className="page-heading">
        {/* <button
          className="np-admin-main-button add-button"
          onClick={() => {
            setTopSheetContent(<AdminContactEdit method="POST" url={url} />);
            setTopSheet(true);
          }}
        >
          Add Contact
        </button> */}
        <Table
          dataSource={contact}
          rowClassName={(record, index) => {
            return record.seen == "false" ? "set-unseen-row" : "";
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default AdminContact;
