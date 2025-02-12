import TaskList from './components/TaskList';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Importa o CSS global
//Router de bonito até alguma outra página ser implementada
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
