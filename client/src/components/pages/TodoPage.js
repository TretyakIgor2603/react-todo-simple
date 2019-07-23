import React from "react";
import { TodoAdd, TodoList } from "../todo";
import { connect } from "react-redux";
import * as todoActions from "store/todo/todo-actions";
import Page from "../layouts";
import styled from "styled-components";
import { ErrorBoundary } from "../error";
import { Alert } from "antd";
import SearchPanel from "../UI/SearchPanel";

const TodoWrap = styled.div`
  max-width: 400px;
`;

class TodoPage extends React.Component {
  state = {
    searchTerm: "",
    currentPage: 1,
    sizePage: 5
  };

  taskAdd = title => {
    const tasksLength = this.props.tasks.length + 1;
    const lastPage = Math.ceil(tasksLength / this.state.sizePage);
    this.setPage(lastPage);
    this.props.addTodo(title);
  };

  setPage = page => this.setState({ currentPage: page });

  searchTasks = searchTerm => this.props.searchTasks(searchTerm);

  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    const { currentPage, sizePage } = this.state;
    const {
      tasks,
      toggleTodoDone,
      removeTodo,
      error,
      loadingSearch
    } = this.props;

    return (
      <ErrorBoundary>
        <Page>
          <TodoWrap>
            <TodoAdd onTodoAdd={this.taskAdd} />
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
                currentPage={currentPage}
                sizePage={sizePage}
                onToggleDone={toggleTodoDone}
                onTodoRemove={removeTodo}
                onChangePaging={this.setPage}
              />
            )}
            <SearchPanel loading={loadingSearch} onSearch={this.searchTasks} />
          </TodoWrap>
        </Page>
      </ErrorBoundary>
    );
  }
}

export default connect(
  ({ todo }) => todo,
  { ...todoActions }
)(TodoPage);
