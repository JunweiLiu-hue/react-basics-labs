import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [ taskState, setTaskState ] = useState({
    tasks: [
      { id: 1, title:"Dishes", description:"Empty dishwasher", deadline: "Today", priority:"Low",done: false },
      { id: 2, title: "Laundry", description:"Fold clothes and put away", deadline: "Tomorrow",priority:"Medium", done: false },
      { id: 3, title: "Tidy up",deadline: "Today", priority:"High",done: false}
    ]
  });

  const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority:""
  });

  const Task = (props) => {
    let priorityColor;

    // 根据优先级设置颜色
    switch (props.priority.toLowerCase()) {
        case 'low':
            priorityColor = 'green';
            break;
        case 'medium':
            priorityColor = 'orange';
            break;
        case 'high':
            priorityColor = 'red';
            break;
        default:
            priorityColor = 'grey'; 
    }

    return (
        <div className="card" style={{ backgroundColor: props.done ? 'lightgrey' : '#5bb4c4' }}>
            <p className="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p className="content">{props.description}</p>
            <button 
                className="priorityButton" 
                style={{ backgroundColor: priorityColor, color: 'white' }}
                disabled 
            >
                {props.priority.charAt(0).toUpperCase() + props.priority.slice(1)}
            </button>
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>
        </div>
    );
}

  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTaskState({tasks});
  }

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks.splice(taskIndex, 1);
    setTaskState({tasks});
  } 

  const formChangeHandler = (event) => {
    let form = {...formState};

    switch(event.target.name) {
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
      case "priority":
          form.priority = event.target.value;
          break;
      default:
          form = formState;
    }
    
    setFormState(form);
    console.log(formState);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const tasks = [...taskState.tasks];
    const form = {...formState};

    form.id = uuidv4();
    
    tasks.push(form);
    setTaskState({tasks});
  }
  
  return (
    <div className="container">
    <h1>Tasky</h1>
    {taskState.tasks.map((task, index) => (              
      <Task 
        title={task.title}
        description={task.description}
        deadline={task.deadline}
        priority={task.priority}
        key={task.id}
        done={task.done}
        markDone={() => doneHandler(index)}
        deleteTask = {() => deleteHandler(index)}
      />
    ))}
   <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
  </div>
  );
}

export default App;
