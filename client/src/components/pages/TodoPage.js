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
    await this.props.fetchTasks(1, this.props.limit, searchTerm);
  };

  componentDidMount = async () => {
    await this.props.fetchTasks(
      this.props.page,
      this.props.perPage,
      this.props.searchTerm
    );
  };

  render() {
    const { account, toggleDoneTask, setPaginationAndFetch } = this.props;
    const {
      tasks,
      tasksFiltered,
      total,
      page,
      perPage,
      isFetching
    } = this.props.todo;
    return (
      <ErrorBoundary>
        <TodoAdd onTodoAdd={this.addTask} account={account} />
        <SearchPanel onSearch={this.searchTasks} />

        <Spin tip="Loading..." spinning={isFetching}>
          <TodoList
            tasks={account.isAuthorized ? tasks : tasksFiltered}
            perPage={perPage}
            total={total}
            currentPage={page}
            onToggleDone={toggleDoneTask}
            onRemoveTodo={this.removeTask}
            onChangePaging={(page) => setPaginationAndFetch(page, perPage)}
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
