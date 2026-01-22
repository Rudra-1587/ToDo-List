const toDoArray = JSON.parse(localStorage.getItem('ToDo')) === null ? [] : JSON.parse(localStorage.getItem('ToDo'));

const taskName = document.querySelector('.js-task-input');
const dueDate = document.querySelector('.js-date-input');

renderTaskArray()

function addTask () {
  const task = {};
  task.taskName = taskName.value;
  task.dueDate = dueDate.value;
  task.done = false;
  toDoArray.unshift(task);
  taskName.value = '';
  dueDate.value = '';
  saveToStorage();
  renderTaskArray()
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

function saveEdit(task, index) {
  task.taskName = taskName.value;
  task.dueDate = dueDate.value;
  saveToStorage();
  taskName.value = '';
  dueDate.value = '';
  renderTaskArray(); 
  document.querySelector(`.js-task-container-${index}`).classList.remove('js-is-editing');
}



function saveToStorage() {
  localStorage.setItem('ToDo', JSON.stringify(toDoArray));
}

function renderTaskArray() {
  let html = '';
  toDoArray.filter((task) => {
    return !task.done;
  }).forEach((task, index) => {
    html += `
      <div class="task-container js-task-container-${index}">
        ${task.taskName}
        ${formatDate(task.dueDate)}
        <button class="js-edit-button">Edit</button>
        <button class="save-button js-save-button">Save</button>
        <button class="js-task-delete-button">Delete</button>
        <button class=" complete-button js-task-complete-button">✅</button>
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
        saveEdit(saveTask, index);
      })
    })

  document.querySelectorAll('.js-task-complete-button').
    forEach((comp, index) => {
      comp.addEventListener('click', () => { 
        toDoArray[index].done = true;
        saveToStorage();
        renderTaskArray();
      })
    })
    console.log(toDoArray)
}


document.querySelector('.js-add-btn').
  addEventListener('click', () => {
    addTask();
  })
