const toDoArray = JSON.parse(localStorage.getItem('ToDo')) === null ? [] : JSON.parse(localStorage.getItem('ToDo')) && renderTaskArray();


function addTask () {
  const task = {};
  const taskName = document.querySelector('.js-task-input').value;
  const dueDate = document.querySelector('.js-date-input').value;
  task.taskName = taskName;
  task.dueDate = dueDate;
  toDoArray.unshift(task);
  saveToStorage();
  renderTaskArray()
}

function saveToStorage() {
  localStorage.setItem('ToDo', JSON.stringify(toDoArray));
}

function renderTaskArray() {
  let html = '';
  const taskArray = JSON.parse(localStorage.getItem('ToDo'));
  taskArray.forEach((task) => {
    html += `
      <div>
        ${task.taskName}
        ${formatDate(task.dueDate)}
        <button>Complete</button>
        <button>Delete</button>
      </div>
    `
  })
  document.querySelector('.js-display-task-area').innerHTML = html;
}

function formatDate(datevalue) {
  const date = new Date(datevalue);
  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
  return formatted
}

document.querySelector('.js-add-btn').
  addEventListener('click', () => {
    addTask();
  })
