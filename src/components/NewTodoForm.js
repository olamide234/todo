import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTodoForm.css";
import {VscAdd} from 'react-icons/vsc';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "", error: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.state.task && this.props.createTodo({ ...this.state, id: uuidv4() });
    this.setState({ task: ""});
    !this.state.task ? this.setState({error: "Please add a todo"}) : this.setState({error: ""})
  }
  render() {
    return (
      <div className="todo__newtodo">
        <div className="todo__newtodo-content">
          <button className="todo__newtodo-content__btn"></button>
          <form onSubmit={this.handleSubmit}>
            <input
              name="task"
              type="text"
              placeholder="Create a new todo..."
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button><VscAdd color="hsl(233, 14%, 35%)" size={25} /></button>
          </form>
        </div>
        <div className="todo__newtodo-error">
          <p>{this.state.error}</p>
        </div>
      </div>
    );
  }
}
