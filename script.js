let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("task-list");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const text = document.createElement("span");
    text.textContent = task.text;
    if (task.completed) text.classList.add("completed");

    const date = document.createElement("span");
    date.classList.add("date");
    date.textContent = task.date ? `📅 ${task.date}` : "";

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(text);
    leftDiv.appendChild(date);

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");

  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === "") return;

  const newTask = { text, date, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
}

renderTasks();
