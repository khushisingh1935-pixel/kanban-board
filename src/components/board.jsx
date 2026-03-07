import { useState, useEffect } from "react";
import TaskCard from "./taskCard";

function Board(){
// Load tasks from localStorage or initialize with an empty array
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
//Delete Task
function deleteTask(index){
  const newTasks = tasks.filter((_, i) => i !== index);
  setTasks(newTasks);
}
//Add Task
function addTask(){
  const title = prompt("Enter Task Title:");
  const description = prompt("Enter Task Description:");

  if(title){
    const newTask = {title, description, status: "todo"};
    setTasks([...tasks, newTask]);
  }
}
//Edit Task
function editTask(index){
  const newTitle = prompt("Edit Task Title:", tasks[index].title);
  const newDescription = prompt("Edit Task Description:", tasks[index].description);

  if(newTitle){
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      title: newTitle,
      description: newDescription,
      status: tasks[index].status
    };
    setTasks(updatedTasks);
  }
}
//Handle Drag and Drop functions
function handleDragStart(e, index){
  e.dataTransfer.setData("taskIndex", index);
}

function handleDrop(e, newStatus){
  const index = e.dataTransfer.getData("taskIndex");

  const updatedTasks = [...tasks];
  updatedTasks[index].status = newStatus;

  setTasks(updatedTasks);
}
//JSX for Board component
return(
<div>

<button className="add" onClick={addTask}>+ Add Task</button>

<div className="board">

<div
  className="column"
  onDragOver={(e)=>e.preventDefault()}
  onDrop={(e)=>handleDrop(e,"todo")}
>
<h2>To Do</h2>

{tasks
  .filter(task => task.status === "todo")
  .map((task,index)=>(
    <TaskCard
      key={index}
      index={index}
      title={task.title}
      description={task.description}
      onDelete={()=>deleteTask(index)}
      onEdit={()=>editTask(index)}
      onDragStart={handleDragStart}
    />
))}

</div>


<div
  className="column"
  onDragOver={(e)=>e.preventDefault()}
  onDrop={(e)=>handleDrop(e,"inprogress")}
>
<h2>In Progress</h2>

{tasks
  .filter(task => task.status === "inprogress")
  .map((task,index)=>(
    <TaskCard
      key={index}
      index={index}
      title={task.title}
      description={task.description}
      onDelete={()=>deleteTask(index)}
      onEdit={()=>editTask(index)}
      onDragStart={handleDragStart}
    />
))}

</div>

<div
  className="column"
  onDragOver={(e)=>e.preventDefault()}
  onDrop={(e)=>handleDrop(e,"done")}
>
<h2>Done</h2>

{tasks
  .filter(task => task.status === "done")
  .map((task,index)=>(
    <TaskCard
      key={index}
      index={index}
      title={task.title}
      description={task.description}
      onDelete={()=>deleteTask(index)}
      onEdit={()=>editTask(index)}
      onDragStart={handleDragStart}
    />
))}

</div>

<div
  className="column"
  onDragOver={(e)=>e.preventDefault()}
  onDrop={(e)=>handleDrop(e,"backlog")}
>
<h2>Backlog</h2>

{tasks
  .filter(task => task.status === "backlog")
  .map((task,index)=>(
    <TaskCard
      key={index}
      index={index}
      title={task.title}
      description={task.description}
      onDelete={()=>deleteTask(index)}
      onEdit={()=>editTask(index)}
      onDragStart={handleDragStart}
    />
))}

</div>
</div>
</div>
);
}

export default Board;