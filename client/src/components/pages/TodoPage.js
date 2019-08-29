import React from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { ErrorBoundary } from "../error/";
import { TodoAdd, TodoList } from "../todo";
import * as todoDbActions from "../../store/todo/todo-db-actions";
import * as todoLocalActions from "../../store/todo/todo-local-actions";
import SearchPanel from "../ui/SearchPanel";

class TodoPage extends React.Component {
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

  getCurrentPage = (offset, limit, total) => {
    const maxPage = Math.ceil(total / limit);
    const currentPage = offset / limit + 1;
    return maxPage < currentPage ? maxPage : currentPage;
  };

  componentDidMount = async () => {
    await this.props.fetchTasks(
      this.props.offset,
      this.props.limit,
      this.props.searchTerm
    );
  };

  render() {
    const { account, toggleDoneTask } = this.props;
    const {
      tasks,
      tasksFiltered,
      total,
      offset,
      limit,
      isFetching
    } = this.props.todo;
    console.log(isFetching);
    return (
      <ErrorBoundary>
        <TodoAdd onTodoAdd={this.addTask} account={account} />
        <SearchPanel onSearch={this.searchTasks} />

        <Spin tip="Loading..." spinning={isFetching}>
          <TodoList
            tasks={account.isAuthorized ? tasks : tasksFiltered}
            limit={limit}
            total={total}
            currentPage={this.getCurrentPage(offset, limit, total)}
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
  { ...todoDbActions, ...todoLocalActions }
)(TodoPage);
