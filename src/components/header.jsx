function Header({toggleTheme}){

  return(
    <header className="header">
      <h1>Kanban Task Manager</h1>

      <div className="btn">
        <button onClick={toggleTheme}>🌙</button>
      </div>

    </header>
  );
}

export default Header;