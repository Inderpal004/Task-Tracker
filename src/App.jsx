import { useState, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import Task from "./components/Task/Task";
import toast from 'react-hot-toast';

function App() {
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState({ title: "", desc: "" });
  const [allProjects, setAllProjects] = useState(() => {
    const savedProjects = localStorage.getItem('allProjects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(null);
  const [completeProject, setCompleteProject] = useState(() => {
    const savedCompletedProjects = localStorage.getItem('completeProject');
    return savedCompletedProjects ? JSON.parse(savedCompletedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem('allProjects', JSON.stringify(allProjects));
  }, [allProjects]);

  useEffect(() => {
    localStorage.setItem('completeProject', JSON.stringify(completeProject));
  }, [completeProject]);

  const showModal = () => setModal(true);

  const addTasks = (newTask) => {
    if (isEditing) {
      const updatedProjects = allProjects.map((task, index) => 
        index === currentIndex ? newTask : task
      );
      setAllProjects(updatedProjects);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setAllProjects([...allProjects, newTask]);
    }
  };

  const editTask = (index) => {
    setProjects(allProjects[index]);
    setIsEditing(true);
    setCurrentIndex(index);
    showModal();
  };

  const dltTask = (index) => {
    const updatedProjects = allProjects.filter((_, i) => i !== index);
    setAllProjects(updatedProjects);
  };

  const handleComplete = (index) => {
    const completedProjects = allProjects.filter((_, i) => i === index);
    const updatedProjects = allProjects.filter((_, i) => i !== index);
    setAllProjects(updatedProjects);
    setCompleteProject((prevCompleted) => [...prevCompleted, ...completedProjects]);
    toast.success("Task completed successfully");
  };

  return (
    <div className='container'>
      <h1 className='heading'>Task Tracker</h1>

      <p className='sm-heading'>Hi there!</p>
      <p className='sm-heading'>
        Click <button onClick={showModal} className='new-task'>+ New</button> to add a new task
      </p>

      <div className="row">
        <div className="tasks-div">
          <div className="tasks">
            <h3 className='task-row-heading'>To Do:</h3>

            <div className="task-container">
              {allProjects.length === 0 ? (
                <p>No tasks available. Please add a new task.</p>
              ) : (
                allProjects.map((item, index) => (
                  <Task 
                    key={index} 
                    title={item.title} 
                    desc={item.desc} 
                    index={index} 
                    dltTask={dltTask} 
                    editTask={editTask} 
                    handleComplete={handleComplete} 
                    isComplete={false}  
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="tasks-div">
          <div className="tasks">
            <h3 className="task-row-heading">Completed:</h3>

            <div className="task-container">
              {completeProject.length === 0 ? (
                <p>No completed tasks.</p>
              ) : (
                completeProject.map((item, index) => (
                  <Task
                    key={index} 
                    title={item.title} 
                    desc={item.desc} 
                    isComplete={true}  
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <AddTask 
          setModal={setModal} 
          projects={projects} 
          setProjects={setProjects} 
          addTasks={addTasks}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default App;
