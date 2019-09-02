import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchUsers,
  fetchUsersRoles
} from "../../store/account/account-actions";
import { getUserIdFromToken } from "../../utils/token";
import { removeUserAndFetchUsers } from "../../store/account/account-actions";
import useModal from "../helpers/useModal";
import Modal from "../ui/Modal";
import UsersTable from "../profile/UsersTable";
import UserUpdateFormWithForm from "../profile/UserUpdateForm";

const ProfilePage = (props) => {
  const {
    fetchUser,
    fetchUsers,
    fetchUsersRoles,
    account: { user, users, userRoles }
  } = props;
  const [isFetching, setFetching] = useState(true);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    function fetchData() {
      fetchUser(getUserIdFromToken());
      fetchUsers();
      fetchUsersRoles();
    }
    fetchData();
    setFetching(false);
  }, [fetchUser, fetchUsers]);

  const handleRemoveUser = async (id) => {
    console.log(id);
    await removeUserAndFetchUsers(id);
  };

  const handleUpdateUser = (id) => {
    console.log(id);
    toggle();
  };

  return !isFetching ? (
    <>
      <div>Hello, {user.username}!</div>
      {/* {user.role === "admin" && <UsersTable users={users} />} */}
      <UsersTable
        users={users}
        currentUser={user}
        handleRemoveUser={handleRemoveUser}
        handleUpdateUser={handleUpdateUser}
      />

      <Modal isShowing={isShowing} hide={toggle} title={"Update user data"}>
        <UserUpdateFormWithForm user={user} userRoles={userRoles} />
      </Modal>
    </>
  ) : null;
};

export default connect(
  (account) => account,
  { fetchUser, fetchUsers, fetchUsersRoles, removeUserAndFetchUsers }
)(ProfilePage);
