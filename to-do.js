const toDoArray = JSON.parse(localStorage.getItem('ToDo')) === null ? [] : JSON.parse(localStorage.getItem('ToDo'));
const taskName = document.querySelector('.js-task-input');
const dueDate = document.querySelector('.js-date-input');

renderTaskArray()


function addTask () {
  const task = {};
  task.taskName = taskName.value;
  task.dueDate = dueDate.value;
  toDoArray.unshift(task);
  taskName.value = '';
  dueDate.value = '';
  saveToStorage();
  renderTaskArray()
}


function saveToStorage() {
  localStorage.setItem('ToDo', JSON.stringify(toDoArray));
}

function renderTaskArray() {
  let html = '';
  toDoArray.forEach((task, index) => {
    html += `
      <div class="task-container js-task-container-${index}">
        ${task.taskName}
        ${formatDate(task.dueDate)}
        <button class="js-edit-button">Edit</button>
        <button class="save-button js-save-button">Save</button>
        <button>Complete</button>
        <button class="js-task-delete-button">Delete</button>
      </div>
    `
  })
  document.querySelector('.js-display-task-area').innerHTML = html;

  document.querySelectorAll('.js-task-delete-button').
  forEach((btn, index) => {
    btn.addEventListener('click', () => {
      toDoArray.splice(index,1);
      saveToStorage()
      renderTaskArray()
    })
  })

  document.querySelectorAll('.js-edit-button').forEach((edit, index) => {
    const editTask = toDoArray[index];
    edit.addEventListener('click', () => {
      taskName.value = editTask.taskName;
      dueDate.value = editTask.dueDate;
      document.querySelector(`.js-task-container-${index}`).classList.add('js-is-editing')
    })
  })

  document.querySelectorAll('.js-save-button').
    forEach((save, index) => {
      const saveTask = toDoArray[index];
      save.addEventListener('click', () => {
        saveTask.taskName = taskName.value;
        saveTask.dueDate = dueDate.value;
        saveToStorage();
        taskName.value = '';
        dueDate.value = '';
        renderTaskArray(); 
        document.querySelector(`.js-task-container-${index}`).classList.remove('js-is-editing')
      })
    })
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
