import TaskList from './components/TaskList';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Importa o CSS global

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Lista de Tarefas</h1>
        </header>
        <TaskList />
      </div>
    </Router>
  );
}

export default App;
