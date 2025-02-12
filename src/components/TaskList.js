import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('todos');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
    setShowForm(false);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    setTaskToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, {
        status: status === 'pendente' ? 'concluído' : 'pendente',
      });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'todos') return true;
    return task.status === filter;
  });

  return (
    <div className="container">
      <button 
        className="add-button" 
        onClick={() => setShowForm(!showForm)}
        style={{ display: !showForm && !taskToEdit ? 'block' : 'none' }}
      >
        Nova Tarefa
      </button>
      
      {(showForm || taskToEdit) && (
        <TaskForm
          onTaskAdded={handleTaskAdded}
          onTaskUpdated={handleTaskUpdated}
          taskToEdit={taskToEdit}
          onCancel={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
        />
      )}

      {/* Área de Filtro */}
      <div className="task-filter">
        <button 
          className={filter === 'todos' ? 'active' : ''}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button 
          className={filter === 'pendente' ? 'active' : ''}
          onClick={() => setFilter('pendente')}
        >
          Pendente
        </button>
        <button 
          className={filter === 'concluído' ? 'active' : ''}
          onClick={() => setFilter('concluído')}
        >
          Concluído
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-state">Nenhuma tarefa encontrada</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
