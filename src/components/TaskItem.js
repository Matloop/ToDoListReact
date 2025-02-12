import React from 'react';

function TaskItem({ task, onDelete, onToggleStatus, onEdit }) {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3>
          {task.title}
          <button
            className="toggle-button"
            onClick={() => onToggleStatus(task.id, task.status)}
          >
            {task.status === 'pendente' ? '✓ Concluir' : '↺ Reabrir'}
          </button>
        </h3>
        <p>{task.description}</p>
      </div>
      <div className="task-status">
        <span className={task.status}>{task.status}</span>
      </div>
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
