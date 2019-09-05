import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchUserById,
  fetchCurrentUser,
  fetchAllUsers,
  fetchUsersRoles,
  updateUser
} from "../../store/account/account-actions";
import { removeUserAndFetchUsers } from "../../store/account/account-actions";
import Modal from "../ui/Modal";
import UsersTable from "../profile/UsersTable";
import UserUpdateForm from "../profile/UserUpdateForm";
import _get from "lodash/fp/get";

class ProfilePage extends Component {
  state = {
    isFetching: true,
    userById: {},
    isShowModalUpdateUser: false,
    userUpdateRefForm: null
  };

  saveFormRef = (formRef) => {
    this.setState({ userUpdateRefForm: formRef });
  };

  handleUpdateUser = async (id) => {
    const userPayload = await this.props.fetchUserById(id);

    this.setState({ userById: _get("response.data.user", userPayload) });
    this.setState({ isShowModalUpdateUser: true });
  };

  handleRemoveUser = async (id) => {
    await removeUserAndFetchUsers(id);
  };

  submitUpdateUser = () => {
    const { updateUser, fetchAllUsers } = this.props;
    const { form } = this.state.userUpdateRefForm.props;

    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await updateUser({ ...this.state.userById, ...values });
      await fetchAllUsers();

      this.setState({ isShowModalUpdateUser: false });
    });
  };

  async componentDidMount() {
    const { user, userRoles, fetchAllUsers } = this.props;
    
    user.role === userRoles.Admin && (await fetchAllUsers());
    this.setState({ isFetching: false });
  }

  render() {
    const { userById, isFetching, isShowModalUpdateUser } = this.state;
    const { user, users, userRoles } = this.props;

    return !isFetching ? (
      <>
        <div>Hello, {user.username}!</div>
        {user.role === userRoles.Admin && (
          <UsersTable
            users={users}
            currentUser={user}
            onClickRemove={this.handleRemoveUser}
            onClickUpdate={this.handleUpdateUser}
          />
        )}

        <Modal
          visible={isShowModalUpdateUser}
          onHide={() => this.setState({ isShowModalUpdateUser: false })}
          title={"Update user data"}
          submitText={"Change"}
          onSubmit={this.submitUpdateUser}
        >
          <UserUpdateForm
            user={userById}
            userRoles={userRoles}
            wrappedComponentRef={this.saveFormRef}
            onFormSubmit={this.submitUpdateUser}
          />
        </Modal>
      </>
    ) : null;
  }
}

export default connect(
  ({ account }) => account,
  {
    fetchUserById,
    fetchCurrentUser,
    fetchAllUsers,
    fetchUsersRoles,
    updateUser,
    removeUserAndFetchUsers
  }
)(ProfilePage);
