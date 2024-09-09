import React from 'react';
import "./Task.css";

export default function Task({ title, desc, index, dltTask, editTask,handleComplete,isComplete }) {
  return (
    <div className="task">
      <div className="task-nav">
        <h3 className="task-heading">{title}</h3>
        {
          isComplete ? null : <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
        }
      </div>

      <p className="task-desc">{desc}</p>

      <div className="btn-row">
       {
        isComplete ? null :  <button onClick={() => dltTask(index)} className="dlt-btn">Delete</button>
       }
        <button onClick={() => handleComplete(index)} className={`complete-btn ${isComplete ? "completed-btn-color" : "complete-btn-color"}`}>{isComplete ? "Completed" : "Complete"}</button>
      </div>
    </div>
  );
}
