const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  saveTasks();
  input.value = "";
  renderTasks();
}

function handleTaskClick(e) {
  const li = e.target.closest("li");
  const index = li.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
    li.style.animation = "fadeOut 0.4s forwards";
    setTimeout(() => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }, 400);
  } else {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    li.classList.toggle("completed", task.completed);
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">&times;</button>
    `;
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}