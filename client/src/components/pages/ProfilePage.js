import React from "react";
import Profile from "../profile/Profile";
import { connect } from "react-redux";

const ProfilePage = ({ user }) => {
  return <Profile user={user} />;
};

export default connect(({ user }) => user)(ProfilePage);
