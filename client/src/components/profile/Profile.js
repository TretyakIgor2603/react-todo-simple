import React, { useState } from "react";
import UsersTable from "./UsersTable";
import { connect } from "react-redux";
import { removeUserAndFetchUsers } from "../../store/account/account-actions";
import ModalWrap from "../ui/Modal";

const Profile = ({ user, users, removeUserAndFetchUsers }) => {
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  const handleRemoveUser = async (id) => {
    console.log(id);
    await removeUserAndFetchUsers(id);
  };

  const handleUpdateUser = (id) => {
    console.log(id);
    setShowUpdateUserModal(true);
  };

  return (
    <>
      <div>Hello, {user.username}!</div>
      {/* {user.role === "admin" && <UsersTable users={users} />} */}
      <UsersTable
        users={users}
        currentUser={user}
        handleRemoveUser={handleRemoveUser}
        handleUpdateUser={handleUpdateUser}
      />

      <ModalWrap visible={showUpdateUserModal}>
        <p>content</p>
      </ModalWrap>
    </>
  );
};

export default connect(
  null,
  { removeUserAndFetchUsers }
)(Profile);
