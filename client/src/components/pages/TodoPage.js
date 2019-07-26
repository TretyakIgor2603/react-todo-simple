import React from "react";
import { TodoAdd, TodoList } from "../todo";
import { connect } from "react-redux";
import * as todoActions from "store/todo/todo-actions";
import { ErrorBoundary } from "../error";
import { Alert } from "antd";
import SearchPanel from "../UI/SearchPanel";

import { Link } from "react-router-dom";

class TodoPage extends React.Component {
  state = {
    searchTerm: "",
    currentPage: 1,
    offset: 0,
    limit: 5
  };

  // this functions need fetch tasks START
  taskAdd = async (title) => {
    await this.props.addTodo(title);
    await this.fetchTasks(
      this.state.searchTerm,
      this.state.offset,
      this.state.limit
    );
  };

  setPage = (page) => {
    const { searchTerm, limit } = this.state;
    const newOffset = page * limit - limit;
    this.fetchTasks(searchTerm, newOffset, limit);

    this.setState({
      currentPage: page,
      offset: newOffset
    });
  };

  searchTasks = async (searchTerm) => {
    this.setState({ searchTerm, currentPage: 1 });
    await this.fetchTasks(searchTerm, 0, this.state.limit);
  };

  removeTask = async (id) => {
    await this.props.removeTask(id);
    await this.fetchTasks(
      this.state.searchTerm,
      this.state.offset,
      this.state.limit
    );
  };
  // this functions need fetch tasks END

  // Get tasks function
  fetchTasks = async (searchTerm, offset, limit) => {
    await this.props.fetchTasks(searchTerm, offset, limit);
  };

  componentDidMount() {
    this.fetchTasks(this.state.searchTerm, this.state.offset, this.state.limit);
  }

  // ????
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.fetchTasks(
        this.state.searchTerm,
        this.state.offset,
        this.state.limit
      );
    }
  }

  render() {
    const { currentPage, limit } = this.state;
    const { tasks, totalTasks, toggleDoneTodo, error } = this.props;

    return (
      <ErrorBoundary>
        <TodoAdd onTodoAdd={this.taskAdd} />
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
            tasksPerPage={limit}
            totalTasks={totalTasks}
            currentPage={currentPage}
            onToggleDone={toggleDoneTodo}
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
