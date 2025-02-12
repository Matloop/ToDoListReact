import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded, taskToEdit, onTaskUpdated, onCancel }) {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      if (taskToEdit) {
        await axios.put(`http://localhost:3001/tasks/${taskToEdit.id}`, {
          title,
          description,
          status: taskToEdit.status,
        });
        onTaskUpdated();
      } else {
        await axios.post('http://localhost:3001/tasks', {
          title,
          description,
          status: 'pendente',
        });
        onTaskAdded();
      }
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa..."
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição da tarefa..."
        rows={3}
      />
      <div className="form-actions">
        <button type="submit">
          {taskToEdit ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
