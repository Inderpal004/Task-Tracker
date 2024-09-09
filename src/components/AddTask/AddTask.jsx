import React from 'react';
import "./AddTask.css";
import toast from 'react-hot-toast';

export default function AddTask({ setModal, projects, setProjects, addTasks, isEditing }) {

  const hideModal = () => {
    setModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjects(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTask = () => {
    if (projects.title.trim().length < 5) {
      toast.error("Project Name must be at least 5 characters long.");
      return;
    }

    if (projects.desc.trim().length < 5) {
      toast.error("Task Description must be at least 5 characters long.");
      return;
    }

    addTasks(projects);
    setProjects({ title: "", desc: "" });
    setModal(false);
    toast.success("Task Added !");
  };


  return (
    <>
    <div className='add-task-page'>
      <div className="add-task-container">
        <div className="add-task-nav">
          <h2 className="add-task-title">{isEditing ? "Edit Task" : "Add Task"}</h2>
          <button onClick={hideModal} className="cancel-btn">X</button>
        </div>
        <hr />
        <div className="add-task-details">
          <label className='project-name-label' htmlFor="project-name">Project Name</label>
          <input 
            value={projects.title} 
            onChange={handleInputChange} 
            name='title' 
            type="text" 
            placeholder='Project' 
            id='project-name' 
          />

          <label className='task-desc-label' htmlFor="task-desc">Task Description</label>
          <textarea 
            value={projects.desc} 
            onChange={handleInputChange} 
            name="desc" 
            placeholder='Task Description' 
            id="task-desc"
          ></textarea>
        </div>
        <hr />
        <div className="add-task-btn-div">
          <button onClick={handleTask} className="add-task">{isEditing ? "Edit Task" : "Add Task"}</button>
        </div>
      </div>
    </div>
  
    </>
  );
}
