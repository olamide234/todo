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
      isCompleted: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
    // this.coverAll = this.coverAll.bind(this);
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
    // if this.props.isCompleted !=
    this.setState({ isCompleted: !this.state.isCompleted });
    this.props.toggleTodo(this.props.id, !this.state.isCompleted);
  }
  // coverAll() {
  //     this.setState((st) => ({
  //         isCompleted: this.props.isCompleted
  //     }))
  // }
  render() {
    // console.log(this.state.isCompleted)
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="todo__oneTodo-editing">
          <div className="todo__oneTodo-editing__content">
            <button className="todo__oneTodo-editing__content-btn"></button>
            <form onSubmit={this.handleUpdate}>
              <input
                type="text"
                value={this.state.task}
                name="task"
                onChange={this.handleChange}
              />
              <button>Save</button>
            </form>
          </div>
        </div>
      );
    } else {
      result = (
        <div
          className={
            this.props.theme ? "todo__oneTodo light-j" : "todo__oneTodo dark-j"
          }
        >
          <div
            className={"todo__oneTodo-main"}
            onClick={this.handleToggleCompletion}
          >
            <button
            //   className={
            //     this.state.isCompleted
            //       ? "todo__oneTodo-main__toggleBtn completed"
            //       : "todo__oneTodo-main__toggleBtn"
            //   }
            //   id={this.props.theme ? "light-k" : "dark-k"}

              className={this.state.isCompleted && this.props.theme
                  ? "todo__oneTodo-main__toggleBtn completed light-kc"
                  : this.state.isCompleted && !this.props.theme
                  ? "todo__oneTodo-main__toggleBtn completed dark-kc"
                  : !this.state.isCompleted && this.props.theme
                  ? "todo__oneTodo-main__toggleBtn  light-k"
                  : !this.state.isCompleted && !this.props.theme
                  ? "todo__oneTodo-main__toggleBtn dark-k"
                  : ""
              }
            >
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
              }
            >
              {this.props.task}
            </p>
          </div>
          <div className="todo__oneTodo-functions">
            {!this.state.isCompleted && !this.props.forCompleted && (
              // <button className="todo__oneTodo-functions__edit" onClick={this.toggleForm}><MdEdit color="hsl(233, 14%, 35%)" size={25}/></button>
              <MdEdit
                className="todo__oneTodo-functions__edit"
                onClick={this.toggleForm}
                color="hsl(233, 14%, 35%)"
                size={25}
              />
            )}
            {/* <button className="todo__oneTodo-functions__delete" onClick={this.handleRemove}><MdDelete color="hsl(233, 14%, 35%)" size={25}/></button> */}
            <MdDelete
              className="todo__oneTodo-functions__delete"
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
