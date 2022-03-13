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
    <div id={theme ? 'light-a' : 'dark-a'}>
      <div className="App" id={theme ? 'light-app' : 'dark-app'}>
        <TodoList forTheme={forTheme}/>
      </div>
    </div>
  );
}

export default App;
