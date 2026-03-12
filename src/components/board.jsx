import { useState, useEffect } from "react";
import TaskCard from "./taskCard";

function Board(){

const [search, setSearch] = useState("");

// Load tasks from localStorage
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

// Delete Task
function deleteTask(index){
  const newTasks = tasks.filter((_, i) => i !== index);
  setTasks(newTasks);
}

// Add Task
function addTask(){
  const title = prompt("Enter Task Title:");
  const description = prompt("Enter Task Description:");
  let priority = prompt("Enter Task Priority (Low, Medium, High):");

  if(!title) return;
  if(!priority) return;

  priority = priority.toLowerCase();

  const validPriorities = ["low","medium","high"];

  if(!validPriorities.includes(priority)){
    alert("Invalid priority! Please enter Low, Medium, or High.");
    return;
  }

  const newTask = {
    title,
    description,
    priority,
    status:"todo"
  };

  setTasks([...tasks, newTask]);
}

// Edit Task
function editTask(index){

  const newTitle = prompt("Edit Task Title:", tasks[index].title);
  const newDescription = prompt("Edit Task Description:", tasks[index].description);

  if(newTitle){

    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      title:newTitle,
      description:newDescription,
      status:tasks[index].status,
      priority:tasks[index].priority
    };

    setTasks(updatedTasks);
  }
}

// Drag Start
function handleDragStart(e,index){
  e.dataTransfer.setData("taskIndex",index);
}

// Drop Task
function handleDrop(e,newStatus){

  const index = e.dataTransfer.getData("taskIndex");

  const updatedTasks = [...tasks];
  updatedTasks[index].status = newStatus;

  setTasks(updatedTasks);
}

// Search Filter
const filteredTasks = tasks.filter(task =>
  task.title.toLowerCase().includes(search.toLowerCase()) ||
  task.description.toLowerCase().includes(search.toLowerCase())
);

// JSX
return(

<div>

<button className="add" onClick={addTask}>+ Add Task</button>

<input
className="search-input"
type="text"
placeholder="🔍 Search tasks..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="board">

{/* TODO COLUMN */}

<div
className="column"
onDragOver={(e)=>e.preventDefault()}
onDrop={(e)=>handleDrop(e,"todo")}
>

<h2>📝 To Do</h2>

{filteredTasks
.filter(task=>task.status==="todo")
.map((task)=>{

const realIndex = tasks.indexOf(task);

return(

<TaskCard
key={realIndex}
index={realIndex}
title={task.title}
description={task.description}
priority={task.priority}
onDelete={()=>deleteTask(realIndex)}
onEdit={()=>editTask(realIndex)}
onDragStart={handleDragStart}
/>

)

})}

</div>


{/* IN PROGRESS */}

<div
className="column"
onDragOver={(e)=>e.preventDefault()}
onDrop={(e)=>handleDrop(e,"inprogress")}
>

<h2>⚙️ In Progress</h2>

{filteredTasks
.filter(task=>task.status==="inprogress")
.map((task)=>{

const realIndex = tasks.indexOf(task);

return(

<TaskCard
key={realIndex}
index={realIndex}
title={task.title}
description={task.description}
priority={task.priority}
onDelete={()=>deleteTask(realIndex)}
onEdit={()=>editTask(realIndex)}
onDragStart={handleDragStart}
/>

)

})}

</div>


{/* DONE */}

<div
className="column"
onDragOver={(e)=>e.preventDefault()}
onDrop={(e)=>handleDrop(e,"done")}
>

<h2>✅ Done</h2>

{filteredTasks
.filter(task=>task.status==="done")
.map((task)=>{

const realIndex = tasks.indexOf(task);

return(

<TaskCard
key={realIndex}
index={realIndex}
title={task.title}
description={task.description}
priority={task.priority}
onDelete={()=>deleteTask(realIndex)}
onEdit={()=>editTask(realIndex)}
onDragStart={handleDragStart}
/>

)

})}

</div>


{/* BACKLOG */}

<div
className="column"
onDragOver={(e)=>e.preventDefault()}
onDrop={(e)=>handleDrop(e,"backlog")}
>

<h2>⏳ Backlog</h2>

{filteredTasks
.filter(task=>task.status==="backlog")
.map((task)=>{

const realIndex = tasks.indexOf(task);

return(

<TaskCard
key={realIndex}
index={realIndex}
title={task.title}
description={task.description}
priority={task.priority}
onDelete={()=>deleteTask(realIndex)}
onEdit={()=>editTask(realIndex)}
onDragStart={handleDragStart}
/>

)

})}

</div>

</div>
</div>

);
}

export default Board;