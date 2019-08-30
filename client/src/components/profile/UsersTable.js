import React from "react";
import { Table, Icon } from "antd";

const dateToLocaleString = (date) => new Date(date).toLocaleString() || ""

const UsersTable = ({
  currentUser,
  users,
  handleUpdateUser,
  handleRemoveUser
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dateToLocaleString(text)
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => dateToLocaleString(text)
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          {console.log("record", record)}
          <Icon onClick={() => handleUpdateUser(record.id)} type="edit" />
          {record.id !== currentUser.id && (
            <Icon
              onClick={() => handleRemoveUser(record.id)}
              style={{ marginLeft: "10px" }}
              type="delete"
            />
          )}
        </span>
      )
    }
  ];

  return <Table rowKey="id" columns={columns} dataSource={users} />;
};

export default UsersTable;
