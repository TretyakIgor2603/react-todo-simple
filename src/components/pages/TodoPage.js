import React from "react";
import { TodoAdd, TodoList } from "../todo";
import { connect } from "react-redux";
import * as todoActions from "store/todo/todo-actions";
import Page from "../layouts";
import styled from "styled-components";
import ErrorBoundary from "../error-boundary";
import { Alert } from "antd";
import SearchPanel from "../UI/SearchPanel";

const TodoWrap = styled.div`
  max-width: 400px;
`;

class TodoPage extends React.Component {
  state = {
    searchTerm: ""
  };

  taskAdd = title => this.props.taskAdd(title);
  searchTasks = searchTerm => this.setState({ searchTerm });

  filteredTasks = (tasks, term) => {
    if (!term || term.length === 0) {
      return tasks;
    }
    return tasks.filter(task => task.title.toLowerCase().indexOf(term) > -1);
  };

  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    const { searchTerm } = this.state;
    // ? many
    const { tasks, toggleDoneTodo, addTodo, removeTodo, error } = this.props;
    const visibleTasks = this.filteredTasks(tasks, searchTerm);

    return (
      <ErrorBoundary>
        <Page>
          <TodoWrap>
            <TodoAdd onTodoAdd={addTodo} />
            {error ? (
              <Alert
                style={{ marginTop: "15px" }}
                message={error}
                type="error"
                showIcon
              />
            ) : (
              <TodoList
                tasks={visibleTasks}
                onToggleDone={toggleDoneTodo}
                onTodoRemove={removeTodo}
              />
            )}
            {tasks.length ? <SearchPanel onSearch={this.searchTasks} /> : null}
          </TodoWrap>
        </Page>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps({ todo }) {
  return {
    tasks: todo.tasks,
    searchTerm: todo.searchTerm,
    error: todo.error
  };
}

export default connect(
  mapStateToProps,
  { ...todoActions }
)(TodoPage);
