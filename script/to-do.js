import {cmplTaskArray , saveToCmplStorage} from "./completedTask.js";

export const toDoArray = JSON.parse(localStorage.getItem('ToDo')) === null ? [] : JSON.parse(localStorage.getItem('ToDo'));
const taskName = document.querySelector('.js-task-input');
const dueDate = document.querySelector('.js-date-input');

export function addTask () {
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

export function formatDate(datevalue) {
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

export function renderTaskArray() {
  let html = '';
  toDoArray.filter((task) => {
    return !task.done;
  }).forEach((task, index) => {
    html += `
      <div class="task-container js-task-container-${index}">
        <div class="task-text">
          <span class="task-name">${task.taskName}</span>
          <span class="task-date">${formatDate(task.dueDate)}</span>
        </div>
        <button class="edit-Button js-edit-button">Edit</button>
        <button class="save-button js-save-button">Save</button>
        <button class="delete-button js-task-delete-button">Delete</button>
        <button class="complete-button js-task-complete-button">✅</button>
      </div>
    `
  })
   if(html === '') {
    document.querySelector('.js-display-task-area').innerHTML = " No Task is Due"
  }
  else{
    document.querySelector('.js-display-task-area').innerHTML = html;
  }


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
        cmplTaskArray.push(toDoArray[index]);
        saveToCmplStorage();
        toDoArray.splice(index, 1);
        saveToStorage();
        renderTaskArray();
      })
    })
}

