const addTaskContent = document.getElementById("addTaskContent");
const addTaskBtn = document.querySelector(".addTaskBtn");

let tasks = getTasksFromLocalStorage();
renderTask(tasks);

addTaskBtn.addEventListener("click", addTask);
document.querySelector(".removeAllTaskBtn").addEventListener("click", removeAllTask);

function removeAllTask() {
    if (confirm("Do you want to remove all task?")) {
        localStorage.removeItem("tasks");
        let tasks = getTasksFromLocalStorage();
        renderTask(tasks);
    }
}

function removeTask(indexTask) {
    if (confirm("Do you want to remove this task?")) {
        tasks.splice(indexTask, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTask(tasks);
    }
}

function editTask(indexTask) {
    addTaskContent.value = tasks[indexTask].name;
    addTaskBtn.setAttribute("id", indexTask);
    renderTask(tasks);
}

function addTask() {
    if (!addTaskContent.value) {
        document.getElementById("tooltip").style.display = "block";
        return;
    }

    let taskIndex = this.getAttribute("id");

    if (taskIndex == 0 | taskIndex) {
        console.log(addTaskContent.value)
        tasks[taskIndex] = { name: addTaskContent.value };
        this.removeAttribute("id");
    } else {
        tasks.push({ name: addTaskContent.value });
    }

    addTaskContent.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(tasks);

    document.getElementById("tooltip").style.display = "none";
}

function getTasksFromLocalStorage() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}


function renderTask(tasks) {


    if (!localStorage.getItem("tasks") || localStorage.getItem("tasks") == "[]") {
        document.getElementById("note").style.display = "block";
        document.querySelector(".removeAllTaskBtn").style.display = "none";
    } else {
        document.getElementById("note").style.display = "none";
        document.querySelector(".removeAllTaskBtn").style.display = "block";
    }

    let content = "";
    tasks.forEach((tasks, index) => {
        content += `<li>
        <div class="taskName">${tasks.name}</div>
        <button class="removeTaskBtn" onclick="removeTask(${index})"><i class='bx bxs-trash'></i></button>
        <button class="editTaskBtn" onclick="editTask(${index})"><i class='bx bxs-edit'></i></button>
         </li>`
    })



    document.getElementById("content").innerHTML = content;
}



