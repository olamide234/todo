import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import sunIcon from "../assets/icon-sun.svg";
import moonIcon from "../assets/icon-moon.svg";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      all: true,
      active: false,
      completed: false,
      activeTodos: [],
      completedTodos: [],
      count: 0,
      toggle: false,
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  create(newTodo) {
    this.setState((st) => ({
      todos: [...st.todos, newTodo],
      count: st.count + 1,
    }));
  }
  remove(id, isComplete) {
    this.state.todos.find((t) => {
      return t.id === id && isComplete === true
        ? this.setState((st) => ({ count: st.count - 0 }))
        : this.state.completed
        ? this.setState((st) => ({ count: st.count - 0 }))
        : t.id === id && isComplete === false
        ? this.setState((st) => ({ count: st.count - 1 }))
        : null;
    });

    this.state.completed &&
      this.setState((st) => ({
        completedTodos: st.completedTodos.filter((t) => t.id !== id),
      }));
    this.setState({
      todos: this.state.todos.filter((t) => t.id !== id),
    });
  }
  update(id, updatedTask) {
    //to update when active is true
    if (this.state.active) {
      const updatedActive = this.state.activeTodos.map((t) => {
        if (t.id === id) {
          return { ...t, task: updatedTask };
        }
        return t;
      });
      this.setState({ todos: updatedActive, activeTodos: updatedActive });
    }
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  toggleCompletion(id, isComplete) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: isComplete };
      }
      return todo;
    });
    if (isComplete === true) {
      this.setState((st) => ({ count: st.count - 1 }));
    } else {
      this.setState((st) => ({ count: st.count + 1 }));
    }
    this.setState({ todos: updatedTodos });
  }

  handleAll() {
    const newAllTodos = this.state.todos.map((t) => {
      if (t.isCompleted === undefined) {
        return { ...t, isCompleted: false };
      }
      return { ...t, isCompleted: t.isCompleted };
    });
    console.log(newAllTodos);
    this.setState({
      todos: newAllTodos,
      all: true,
      active: false,
      completed: false,
    });
  }

  handleActive() {
    const activatedTodos = this.state.todos.filter((todo) => {
      return !todo.isCompleted;
    });
    this.setState({
      activeTodos: activatedTodos,
      all: false,
      active: true,
      completed: false,
    });
  }
  handleCompleted() {
    const completedTodos = this.state.todos.filter((todo) => {
      return todo.isCompleted;
    });
    this.setState({
      completedTodos: completedTodos,
      all: false,
      active: false,
      completed: true,
    });
  }
  handleClear() {
    const clearCompleted = this.state.todos.filter(
      (t) => t.isCompleted !== true
    );

    this.setState((st) => ({
      todos: clearCompleted,
      completedTodos: [],
    }));
  }
  toggleTheme() {
    this.setState({ toggle: !this.state.toggle });
    this.props.forTheme(!this.state.toggle);
  }
  render() {
    const { active, completed, all, todos, activeTodos, completedTodos } =
      this.state;
    console.log(todos);
    const output = all
      ? todos?.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.isCompleted && "line-through",
              color: todo.isCompleted && "hsl(234, 11%, 52%)",
              listStyle: "none",
            }}
          >
            <Todo
              id={todo.id}
              task={todo.task}
              forCompleted={todo.isCompleted}
              removeTodo={this.remove}
              updateTodo={this.update}
              toggleTodo={this.toggleCompletion}
              theme={this.state.toggle}
            />
          </li>
        ))
      : active
      ? activeTodos.map((todo) => (
          <li key={todo.id} style={{ listStyle: "none" }}>
            <Todo
              id={todo.id}
              task={todo.task}
              removeTodo={this.remove}
              updateTodo={this.update}
              toggleTodo={this.toggleCompletion}
              theme={this.state.toggle}
            />
          </li>
        ))
      : completed
      ? completedTodos.map((todo) => (
          <li
            className="completed-li"
            key={todo.id}
            style={{ listStyle: "none" }}
          >
            <Todo
              id={todo.id}
              task={todo.task}
              forCompleted={todo.isCompleted}
              removeTodo={this.remove}
              toggleTodo={this.toggleCompletion} 
              theme={this.state.toggle}
            />
          </li>
        ))
      : null;
    return (
      <div className="todo__todolist">
        <div className="todo__todolist-heading">
          <h1>TODO</h1>
          <img
            src={this.state.toggle ? moonIcon : sunIcon}
            alt={this.state.toggle ? "moonIcon" : "sunIcon"}
            onClick={this.toggleTheme}
          />
        </div>
        <NewTodoForm createTodo={this.create} theme={this.state.toggle}/>
        <ul>{output}</ul>
        <div
          className={this.state.toggle ? "todo__todolist-functions light-i" : "todo__todolist-functions dark-i"}
        >
          <p className={this.state.toggle ? "light-iv" : "dark-iv"}>{this.state.count} items left</p>
          <div className={this.state.toggle ? "todo__todolist-functions__btn light-ii" : "todo__todolist-functions__btn dark-ii"}>
            <button onClick={this.handleAll}>All</button>
            <button onClick={this.handleActive}>Active</button>
            <button onClick={this.handleCompleted}>Completed</button>
          </div>
          <button
            className={this.state.toggle ? "todo__todolist-functions__CComp light-iii" : "todo__todolist-functions__CComp dark-iii"}
            onClick={this.handleClear}
          >
            Clear Completed
          </button>
        </div>
        <div className="todo__todolist-p">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    );
  }
}
