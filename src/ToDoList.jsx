import React, {useState, useEffect} from 'react';

function ToDoList(){

    const [tasks,setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState("");

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function handleAddTask(){
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask("");
        }
    }

    function handleRemoveTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    
    function toggleButton(){
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.body.setAttribute("data-theme", newTheme);
    }

    return(<>
    <label>
        <input className="toggle" type="checkbox" onClick={toggleButton} checked={theme === "dark"} readOnly/> 
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
    </label> 

    <div className="to-do-list">
        <h1>TO-DO LIST</h1>
        <input type= "text" placeholder="ENTER TASK" value={newTask} onChange={handleInputChange}></input>
        <button className="add-button" onClick={handleAddTask}>ADD</button>

        <ol>
            {tasks.map((task,index)=>
            <li key={index}><span className="text">{task}</span>
            <button className="delete-button" onClick={()=>handleRemoveTask(index)}>DELETE</button>
            <button className="move-up-button" onClick={()=>moveTaskUp(index)}>👆</button>
            <button className="move-down-button" onClick={()=>moveTaskDown(index)}>👇</button></li>)}
        </ol>
    </div>
    </>);
}
export default ToDoList