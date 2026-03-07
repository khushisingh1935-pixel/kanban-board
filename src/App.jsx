import { useState, useEffect } from "react";
import Header from "./components/header";
import Board from "./components/board";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme(){
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div>
      <Header toggleTheme={toggleTheme} />
      <Board />
    </div>
  );
}

export default App;