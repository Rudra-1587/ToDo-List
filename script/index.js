import {renderTaskArray, addTask} from "./to-do.js";

document.querySelector('.js-add-btn').
  addEventListener('click', () => {
    addTask();
  })

document.querySelector('.js-complete-task-page').
  addEventListener('click', () => {
    window.location.href = "../ToDo List/completedTask.html";
  })

renderTaskArray()
