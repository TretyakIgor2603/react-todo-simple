import React from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { ErrorBoundary } from "../error/";
import { TodoAdd, TodoList } from "../todo";
import * as todoActions from "../../store/todo/todo-actions";
import SearchPanel from "../ui/SearchPanel";

class TodoPage extends React.Component {
  state = {
    loading: true
  };

  addTask = async (title) => {
    const tasks = [{ title }];
    await this.props.addTasksAndFetch(tasks);
  };

  removeTask = async (id) => {
    await this.props.removeTaskAndFetch(id);
  };

  searchTasks = async (searchTerm) => {
    await this.props.fetchTasks(0, this.props.limit, searchTerm);
  };

  setPage = (page) => {
    const { limit } = this.props.todo;
    const newOffset = page * limit - limit;
    this.props.setPaginationAndFetch(newOffset, limit);
  };

  getCurrentPage = (offset, limit) => offset / limit + 1;

  componentDidMount = async () => {
    console.log('componentDidMount fetchTasks')
    await this.props.fetchTasks(
      this.props.offset,
      this.props.limit,
      this.props.searchTerm
    );
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const { account, toggleDoneTask } = this.props;
    const { tasks, tasksFiltered, total, offset, limit } = this.props.todo;

    return (
      <ErrorBoundary>
        <TodoAdd onTodoAdd={this.addTask} account={account} />
        <SearchPanel onSearch={this.searchTasks} />

        <Spin tip="Loading..." spinning={loading}>
          <TodoList
            tasks={account.isAuthorized ? tasks : tasksFiltered}
            limit={limit}
            total={total}
            currentPage={this.getCurrentPage(offset, limit)}
            onToggleDone={toggleDoneTask}
            onRemoveTodo={this.removeTask}
            onChangePaging={this.setPage}
          />
        </Spin>
      </ErrorBoundary>
    );
  }
}

export default connect(
  (state) => ({
    todo: state.todo,
    account: state.account
  }),
  { ...todoActions }
)(TodoPage);
