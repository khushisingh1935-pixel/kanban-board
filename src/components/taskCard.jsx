function TaskCard({title, description, onDelete, onEdit, onDragStart, index}){

return(
<div 
    className="task-card"
    draggable
    onDragStart={(e) => onDragStart(e, index)}
>

<h3>{title}</h3>
<p>{description}</p>

<div className="task-btn">
<button onClick = {onEdit}>Edit Task</button>
<button onClick={onDelete}>Delete Task</button>
</div>

</div>
);
}

export default TaskCard;