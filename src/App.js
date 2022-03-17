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
    <div className={theme ? 'light-a' : 'dark-a'}>
      <div className={theme ? 'App light-app' : 'App dark-app'}>
        <TodoList forTheme={forTheme}/>
      </div>
    </div>
  );
}

export default App;
