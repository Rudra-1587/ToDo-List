import {renderTaskArray, addTask} from "./to-do.js";

document.querySelector('.js-add-btn').
  addEventListener('click', () => {
    addTask();
  })

renderTaskArray()

