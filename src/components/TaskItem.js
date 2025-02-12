import React from 'react';
//Componente para mostrar cada tarefa
function TaskItem({ task, onDelete, onToggleStatus, onEdit }) {
  return (
    
    <div className="task-item">
      {/* Conteúdo principal da tarefa */}
      <div className="task-content">
        <h3>
          {task.title}
          {/* Botão para alternar status */}
          <button
            className="toggle-button"
            onClick={() => onToggleStatus(task.id, task.status)}
          >
            {task.status === 'pendente' ? '✓ Concluir' : '↺ Cancelar'}
          </button>
        </h3>
        <p>{task.description}</p>
      </div>
      {/* Exibição do status */}
      <div className="task-status">
        <span className={task.status}>{task.status}</span>
      </div>
      {/* Ações da tarefa */}
      <div className="task-actions">
        <button className="edit-button" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
