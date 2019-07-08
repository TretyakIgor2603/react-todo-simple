import React, { Component } from "react";

export default class TodoAdd extends Component {
  state = {
    taskText: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { taskText } = this.state;
    if (taskText !== "") {
      this.setState({ taskText: "" });
      this.props.onTaskAdded(this.state.taskText);
    }
  };

  onInputChange = e => {
    this.setState({
      taskText: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Enter task text..."
          onChange={e => this.onInputChange(e)}
          value={this.state.taskText}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
