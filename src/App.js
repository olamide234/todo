import React, { useState } from "react";
import './App.css';
import MultipleForm from './MultipleForm';
import TodoList from './components/TodoList';

function App() {
  const [theme, setTheme] = useState(false);
  const forTheme = (mode) => {
    setTheme(mode);
  }
  return (
    <div className="App">
      <TodoList forTheme={forTheme}/>
    </div>
  );
}

export default App;
