import React from "react";
import TodoAdd from "../todo/todo-add/TodoAdd";
import TodoList from "../todo/TodoList";
import { connect } from "react-redux";
import { onTodoAdd, todoToggleDone, todoRemove } from "../todo/todo-actions";

class TodoPage extends React.Component {
  taskAdd = title => this.props.taskAdd(title);

  render() {
    const { tasks, onTodoToggleDone, onTodoAdd, onTodoRemove } = this.props;
    return (
      <>
        <TodoAdd onTodoAdd={onTodoAdd} />
        <TodoList
          tasks={tasks}
          onToggleDone={onTodoToggleDone}
          onTodoRemove={onTodoRemove}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.todoAdd.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoAdd: title => dispatch(onTodoAdd(title)),
    onTodoToggleDone: id => dispatch(todoToggleDone(id)),
    onTodoRemove: id => dispatch(todoRemove(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
