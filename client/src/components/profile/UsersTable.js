import React from "react";
import { Table, Icon } from "antd";

const dateToLocaleString = (date) => new Date(date).toLocaleString() || "";

const UsersTable = ({ currentUser, users, onClickUpdate, onClickRemove }) => {
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
          <Icon onClick={() => onClickUpdate(record.id)} type="edit" />
          {record.id !== currentUser.id && (
            <Icon
              onClick={() => onClickRemove(record.id)}
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
