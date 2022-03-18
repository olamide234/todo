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
      <div className= "todo__newtodo">
        <div className={this.props.theme ? "todo__newtodo-content light1" : "todo__newtodo-content dark1"}>
          <button className={this.props.theme ? "todo__newtodo-content__btn light2" : "todo__newtodo-content__btn dark2"}></button>
          <form onSubmit={this.handleSubmit}>
            <input className={this.props.theme ? "light3" : "dark3"}
              name="task"
              type="text"
              placeholder="Create a new todo..."
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button className={this.props.theme ? "light4" : "dark4"}><VscAdd color="hsl(233, 14%, 35%)" size={25} /></button>
          </form>
        </div>
        <div className="todo__newtodo-error">
          <p>{this.state.error}</p>
        </div>
      </div>
    );
  }
}
