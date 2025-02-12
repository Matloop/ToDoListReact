import React, { useState } from 'react';
import axios from 'axios';
// Componente para formulário de criação/edição de tarefas

function TaskForm({ onTaskAdded, taskToEdit, onTaskUpdated, onCancel }) {
   // Estados controlados para formulário
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  //Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    //Vai mandar ou a requisição POST ou PUT dependendo da ação
    try {
      if (taskToEdit) {
        // Atualiza tarefa existente
        await axios.put(`http://localhost:3001/tasks/${taskToEdit.id}`, {
          title,
          description,
          status: taskToEdit.status,
        });
        onTaskUpdated();
      } else {
        // Cria nova tarefa

        await axios.post('http://localhost:3001/tasks', {
          title,
          description,
          status: 'pendente',
        });
        onTaskAdded();
      }
      //Reseta os campos quando dar certo
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Campo de título */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa..."
        required
      />
       {/* Campo de descrição */}
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
