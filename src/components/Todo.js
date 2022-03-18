import React, { Component } from "react";
import "./Todo.css";
import { MdEdit, MdDelete } from "react-icons/md";
import checkIcon from "../assets/icon-check.svg";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task,
      isCompleted: this.props.forCompleted,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
  }
  handleRemove() {
    this.props.removeTodo(this.props.id, this.state.isCompleted);
  }
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleUpdate(evt) {
    evt.preventDefault();
    //take new task data and pass up to parent
    this.props.updateTodo(this.props.id, this.state.task);
    this.toggleForm();
  }
  handleChange(evt) {
    this.setState({
      task: evt.target.value,
    });
  }
  handleToggleCompletion() {
    this.setState({ isCompleted: !this.state.isCompleted });
    this.props.toggleTodo(this.props.id, !this.state.isCompleted);
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className={this.props.theme ? "todo__oneTodo-editing light-m" : "todo__oneTodo-editing dark-m"}>
          <div className="todo__oneTodo-editing__content">
            <button className={this.props.theme ? "todo__oneTodo-editing__content-btn light-n" : "todo__oneTodo-editing__content-btn dark-n"}></button>
            <form onSubmit={this.handleUpdate}>
              <input className={this.props.theme ? "light-o" : "dark-o"}
                type="text"
                value={this.state.task}
                name="task"
                onChange={this.handleChange}
              />
              <button className={this.props.theme ? "todo__oneTodo-editing__content-save light-p" : "todo__oneTodo-editing__content-save dark-p"}>Save</button>
            </form>
          </div>
        </div>
      );
    } else {
      result = (
        <div className={this.props.theme ? "todo__oneTodo light-j" : "todo__oneTodo dark-j"}>
          <div
            className={"todo__oneTodo-main"}
            onClick={this.handleToggleCompletion}
          > 
            <button className={this.state.isCompleted && this.props.theme
                ? "todo__oneTodo-main__toggleBtn completed light-kc"
                : this.state.isCompleted && !this.props.theme
                ? "todo__oneTodo-main__toggleBtn completed dark-kc"
                : !this.state.isCompleted && this.props.theme
                ? "todo__oneTodo-main__toggleBtn  light-k"
                : !this.state.isCompleted && !this.props.theme
                ? "todo__oneTodo-main__toggleBtn dark-k"
                : ""
            }>
              {this.state.isCompleted && (
                <img src={checkIcon} alt={"checkIcon"} />
              )}
            </button>
            <p className={this.state.isCompleted && this.props.theme
                ? "todo__oneTodo-main__txt-completed light-lc" 
                : this.state.isCompleted && !this.props.theme
                ? "todo__oneTodo-main__txt-completed dark-lc"
                : !this.state.isCompleted && this.props.theme
                ? "todo__oneTodo-main__txt light-l"
                : !this.state.isCompleted && !this.props.theme
                ? "todo__oneTodo-main__txt dark-l"
                : ""
            }>
              {this.props.task}
            </p>
          </div>
          <div className="todo__oneTodo-functions">
            {!this.state.isCompleted && !this.props.forCompleted && (
              <MdEdit
                className={this.props.theme ? "todo__oneTodo-functions__edit light-q" : "todo__oneTodo-functions__edit dark-q"}
                onClick={this.toggleForm}
                color="hsl(233, 14%, 35%)"
                size={25}
              />
            )}
            <MdDelete
              className={this.props.theme ? "todo__oneTodo-functions__delete light-q" : "todo__oneTodo-functions__delete dark-q"}
              onClick={this.handleRemove}
              color="hsl(233, 14%, 35%)"
              size={25}
            />
          </div>
        </div>
      );
    }
    return result;
  }
}
