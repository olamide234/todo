import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import './TodoList.css';
import sunIcon from'./assets/icon-sun.svg';
import moonIcon from'./assets/icon-moon.svg';

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
      toggle: false
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    // this.toComplete = this.toComplete.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  create(newTodo) {
    this.setState((st) => ({
      todos: [...st.todos, newTodo],
      count: st.count + 1,
    }));
  }
  remove(id) {
    this.setState((st) => ({
      todos: this.state.todos.filter((t) => t.id !== id),
      count: st.count - 1,
    }));
  }
  update(id, updatedTask) {
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
      if(t.isCompleted === undefined) {
        return {...t, isCompleted: false}
      }
      return {...t, isCompleted: t.isCompleted}
    });
    console.log(newAllTodos);
    this.setState({ 
      todos: newAllTodos,
      all: true,
      active: false,
      completed: false
    });
  }
  
  handleActive() {
      const activatedTodos = this.state.todos.filter(todo => {
          return !todo.isCompleted
      })
      this.setState({
        activeTodos: activatedTodos,
        all: false,
        active: true,
        completed: false
      });
  }
  handleCompleted() {
    const completedTodos = this.state.todos.filter(todo => {
        return todo.isCompleted
    })
    this.setState({
      completedTodos: completedTodos,
      all: false,
      active: false,
      completed: true
    });
  }
  toggleTheme(){
    this.setState({toggle: !this.state.toggle});
  }
  render() {
    const {active, completed, all, todos, activeTodos, completedTodos} = this.state;
    console.log(todos);
    const output = all ? todos?.map((todo) => (
      <li key={todo.id} style={{textDecoration: todo.isCompleted && 'line-through', 
        color: todo.isCompleted && 'hsl(234, 11%, 52%)', listStyle: 'none'}}>
        <Todo
          id={todo.id}
          task={todo.task}
          forCompleted={todo.isCompleted}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      </li>
    ))
    :active ? activeTodos.map((todo) => (
      <li key={todo.id} style={{listStyle: 'none'}}>
        <Todo
          id={todo.id}
          task={todo.task}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      </li>
    ))
    :completed ? completedTodos.map((todo) => (
      <li className="completed-li" key={todo.id} style={{listStyle: 'none'}}>
        <Todo
          id={todo.id}
          task={todo.task}
          removeTodo={this.remove}
          updateTodo={this.update}
          toggleTodo={this.toggleCompletion}
        />
      </li>
    ))
    : null
    return (
      <div className="todo__todolist">
        <div className="todo__todolist-heading">
          <h1>TODO</h1>
          <img src= {this.state.toggle ? moonIcon : sunIcon} 
            alt={this.state.toggle ? 'moonIcon' : 'sunIcon'}
            onClick={this.toggleTheme}
          />
        </div>
        <NewTodoForm createTodo={this.create} />
        <ul>
          {output}
        </ul>
        <div className="todo__todolist-functions" id= {this.state.toggle ? 'light' : 'dark'}>
          <p>{this.state.count} items left</p>
          <div className="todo__todolist-functions__btn">
            <button onClick={this.handleAll}>All</button>
            <button onClick={this.handleActive}>Active</button>
            <button onClick={this.handleCompleted}>Completed</button>
          </div>
          <button className="todo__todolist-functions__CComp">Clear Completed</button>
        </div>
        <div className="todo__todolist-p">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    );
  }
}

