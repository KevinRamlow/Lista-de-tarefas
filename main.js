const addTask = document.getElementById("addTask");
const tasks = document.getElementById("tasks");

function createLi() {
  const li = document.createElement("li");
  return li;
}

addTask.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!addTask.value) return;
    createTask(addTask.value);
  }
});

function cleanInput() {
  addTask.value = "";
  addTask.focus();
}

function createDelete(li) {
  li.innerText += " ";
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Apagar tarefa";
  li.appendChild(deleteButton);
  deleteButton.setAttribute("class", "delete");
}

function createTask(textInput) {
  const li = createLi();
  li.innerText = textInput;
  tasks.appendChild(li);
  cleanInput();
  createDelete(li);
  saveTasks();
}

function clicking() {
  if (!addTask.value) return;
  createTask(addTask.value);
}

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete")) el.parentElement.remove();
  saveTasks();
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];
  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("Apagar tarefa", "").trim();
    taskList.push(taskText);
    console.log(taskList);
  }
  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem("tasks", tasksJSON);
}

function addSavesTasks() {
  const tasks = localStorage.getItem("tasks");
  const taskList = JSON.parse(tasks);
  for (let task of taskList) {
    createTask(task);
  }
}

addSavesTasks();
