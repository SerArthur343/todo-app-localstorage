// TO-DO APP





const addTaskButton = document.querySelector(".addTaskButton");
const taskList = document.querySelector(".taskList");
const info = document.querySelector(".info");
 
let tasks = [];



window.addEventListener("load", () => {

    const registeredTasks = localStorage.getItem("tasks");

    if(registeredTasks) {
        tasks = JSON.parse(registeredTasks);
    }

    renderTasks();
});



addTaskButton.addEventListener("click", () => {

    if(tasks.length >= 8) {
        info.textContent = "You can't add more than 8 tasks!";
        return
    }

    const text = prompt("Add new task!");
    if(!text) return;

    addTask(text);
});



document.addEventListener("keydown", e => {
    if(e.key === "Enter") {
        if(tasks.length >= 8) {
        info.textContent = "You can't add more than 8 tasks!";
        return
    }

    const text = prompt("Add new task!");
    if(!text) return;

    addTask(text);
    }
});



function addTask(text) {
    
    const newTask = {
        text: text, completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}



function deleteTask(index) {

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}



function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const addedTask = document.createElement("div");
        addedTask.classList.add("addedTask");

        const addedInput = document.createElement("input");
        addedInput.classList.add("addedInput");
        addedInput.value = task.text;

        if(task.completed) {
            addedInput.classList.add("done-style");
        }

        const doneMarkingButton = document.createElement("button");
        doneMarkingButton.classList.add("doneMarkingButton");
        doneMarkingButton.textContent = "✅";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "❌";

        addedTask.appendChild(addedInput);
        addedTask.appendChild(doneMarkingButton);
        addedTask.appendChild(deleteButton);

        taskList.appendChild(addedTask);



        doneMarkingButton.addEventListener("click", () => {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });



        deleteButton.addEventListener("click", () => {
            deleteTask(index);
        });



        addedInput.addEventListener("change", () => {
            task.text = addedInput.value;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    });


 
    info.textContent = 
        tasks.length >= 8
            ? "You can't add more than 8 tasks!"
            : "Press the button to add a new task!";
}




