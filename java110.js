// PROJE PRATİĞİ 17 --- TO-DO APP V3 





/*
tasks array
↓
localStorage
↓
renderTasks()
↓
addTask()
↓
deleteTask()
*/





const addTaskButton = document.querySelector(".addTaskButton");
const taskList = document.querySelector(".taskList");
const info = document.querySelector(".info");

// Görevler Array'i
 
let tasks = [];



// Sayfa Yüklendiğinde Local Storage'dan Yükle

window.addEventListener("load", () => {

    const registeredTasks = localStorage.getItem("tasks");

    if(registeredTasks) {
        tasks = JSON.parse(registeredTasks);
    }

    renderTasks();
});



// Task Ekleme

addTaskButton.addEventListener("click", () => {

    if(tasks.length >= 8) {
        info.textContent = "You can't add more than 8 tasks!";
        return
    }

    const text = prompt("Add new task!");
    if(!text) return;

    addTask(text);
});



// Enter'la Task Ekleme

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



// Görev Ekleme Fonksiyonu 

function addTask(text) {
    
    const newTask = {
        text: text, completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}



// Görev Silme Fonksiyonu 

function deleteTask(index) {

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}



// Task'leri DOM'a Basma Fonksiyonu 

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



        // Tamamlandı Olarak İşaretleme

        doneMarkingButton.addEventListener("click", () => {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });



        // Task Silme 

        deleteButton.addEventListener("click", () => {
            deleteTask(index);
        });



        // Input Değiştirme 

        addedInput.addEventListener("change", () => {
            task.text = addedInput.value;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    });

    // Bilgilendirme Mesaj(lar)ı

    info.textContent = 
        tasks.length >= 8
            ? "You can't add more than 8 tasks!"
            : "Press the button to add a new task!";
}




