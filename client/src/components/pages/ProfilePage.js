import React, { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { connect } from "react-redux";
import { fetchUser, fetchUsers } from "../../store/account/account-actions";
import { getUserIdFromToken } from "../../utils/token";

const ProfilePage = (props) => {
  const {
    fetchUser,
    fetchUsers,
    account: { user, users }
  } = props;
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    function fetchData() {
      fetchUser(getUserIdFromToken());
      fetchUsers();
    }
    fetchData();
    setFetching(false);
  }, [fetchUser, fetchUsers]);

  return !isFetching ? <Profile user={user} users={users} /> : null;
};

export default connect(
  (account) => account,
  { fetchUser, fetchUsers }
)(ProfilePage);
