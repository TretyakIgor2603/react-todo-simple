import React, { Component } from "react";
import TodoList from "../todo-list/todo-list";
import TodoAdd from "../todo-add/todo-add";

export default class App extends Component {
  state = {
    tasks: []
  };

  taskAdded = taskText => {
    this.setState({
      tasks: [...this.state.tasks, { text: taskText }]
    });
  };

  render() {
    return (
      <React.Fragment>
        <TodoAdd onTaskAdded={this.taskAdded} />
        <TodoList tasks={this.state.tasks} />
      </React.Fragment>
    );
  }
}
