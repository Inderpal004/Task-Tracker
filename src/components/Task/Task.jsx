import React from 'react';
import "./Task.css";

export default function Task({ title, desc, index, dltTask, editTask, handleComplete, isComplete }) {
  return (
    <div className="task">
      <div className="task-nav">
        <h3 className="task-heading">{title}</h3>
        {!isComplete && (
          <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
        )}
      </div>

      <p className="task-desc">{desc}</p>

      <div className="btn-row">
        {!isComplete && (
          <>
            <button onClick={() => dltTask(index)} className="dlt-btn">Delete</button>
            <button onClick={() => handleComplete(index)} className="complete-btn complete-btn-color">Complete</button>
          </>
        )}

        {isComplete && (
          <button className="complete-btn completed-btn-color" disabled>Task Completed</button>
        )}
      </div>
    </div>
  );
}
