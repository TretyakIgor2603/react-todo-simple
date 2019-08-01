import React from "react";
import { TodoAdd, TodoList } from "../todo";
import { connect } from "react-redux";
import * as todoActions from "store/todo/actions";
import { ErrorBoundary } from "../error";
import { Alert } from "antd";
import SearchPanel from "../UI/SearchPanel";

class TodoPage extends React.Component {
  addTask = async (title) => {
    await this.props.addTaskAndFetch(title);
  };

  removeTask = async (id) => {
    await this.props.removeTaskAndFetch(id);
  };
  
  searchTasks = async (searchTerm) => {
    await this.props.fetchTasks(0, this.props.limit, searchTerm);
  };
  
  setPage = (page) => {
    const { limit } = this.props;
    const newOffset = page * limit - limit;
    this.props.setPaginationAndFetch(newOffset);
  };
  
  getCurrentPage = (offset, limit) => offset / limit + 1;

  componentDidMount() {
    this.props.fetchTasks(
      this.props.offset,
      this.props.limit,
      this.props.searchTerm
    );
  }

  render() {
    const { tasks, total, offset, limit, toggleDoneTask, error } = this.props;

    return (
      <ErrorBoundary>
        <TodoAdd onTodoAdd={this.addTask} />
        <SearchPanel onSearch={this.searchTasks} />
        {error.length ? (
          <Alert
            style={{ marginTop: "15px" }}
            message={error}
            type="error"
            showIcon
          />
        ) : (
          <TodoList
            tasks={tasks}
            limit={limit}
            total={total}
            currentPage={this.getCurrentPage(offset, limit)}
            onToggleDone={toggleDoneTask}
            onRemoveTodo={this.removeTask}
            onChangePaging={this.setPage}
          />
        )}
      </ErrorBoundary>
    );
  }
}

export default connect(
  ({ todo }) => todo,
  { ...todoActions }
)(TodoPage);
