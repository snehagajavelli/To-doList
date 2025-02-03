document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("deadlineInput");
    let taskText = taskInput.value.trim();
    let deadlineValue = deadlineInput.value;
    
    if (taskText === "") return;
    
    let formattedDeadline = "";
    if (deadlineValue) {
        let dateParts = deadlineValue.split("-");
        formattedDeadline = `Deadline: ${dateParts[2]}/${dateParts[1]}/${dateParts[0].slice(2)}`;
    }
    
    let taskObj = { text: taskText, deadline: formattedDeadline, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    renderTask(taskObj);
    
    taskInput.value = "";
    deadlineInput.value = "";
}

function renderTask(taskObj) {
    let li = document.createElement("li");
    li.innerHTML = `<button class="check-btn ${taskObj.completed ? 'completed' : ''}" onclick="toggleComplete(this)">&#10003;</button> 
                    <div class="task-details">
                        <span>${taskObj.text}</span>
                        ${taskObj.deadline ? `<span class="deadline-text">${taskObj.deadline}</span>` : ""}
                    </div>
                    <button class="delete-btn" onclick="deleteTask(this)">X</button>`;
    document.getElementById("taskList").appendChild(li);
}

function deleteTask(button) {
    let taskText = button.previousElementSibling.querySelector("span").innerText;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    button.parentElement.remove();
}

function toggleComplete(button) {
    button.classList.toggle("completed");
    let taskText = button.nextElementSibling.querySelector("span").innerText;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}
