import React, { useEffect } from "react";
import Profile from "../profile/Profile";
import { connect } from "react-redux";
import { fetchUsers } from "../../store/account/account-actions";
import { getUserIdFromToken } from "../../store/account/account-utils";

const ProfilePage = ({ user, fetchUsers }) => {
  useEffect(async () => {
    await fetchUsers(getUserIdFromToken());
  }, []);

  return <Profile user={user} />;
};

export default connect(
  ({ user }) => user,
  { fetchUsers }
)(ProfilePage);
