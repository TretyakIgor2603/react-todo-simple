import React, { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { connect } from "react-redux";
import { fetchUsers } from "../../store/account/account-actions";
import { getUserIdFromToken } from "../../utils/token";

const ProfilePage = (props) => {
  const { fetchUsers, account: { user } } = props;
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetchUsers(getUserIdFromToken());
    }
    fetchData();
    setFetching(false);
  }, [fetchUsers]);

  return !isFetching ? <Profile user={user} /> : null;
};

export default connect(
  (account) => account,
  { fetchUsers }
)(ProfilePage);
