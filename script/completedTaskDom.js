import { cmplTaskArray, saveToCmplStorage } from "./completedTask.js";
import {formatDate} from "./to-do.js";

function renderCompleteTask() {
  let html = '';
  cmplTaskArray.forEach((task, index) => {
    html += `
      <div class="task-container js-task-container-${index}">
        <div class="task-text">
          <span class="task-name">${task.taskName}</span>
          <span class="task-date">${formatDate(task.dueDate)}</span>
        </div>
        <button class="Cmpl-delete-button js-task-delete-cmpl">Delete</button>
      </div>
    `;
  })
  if(html === '') {
    document.querySelector('.js-completed-task-list').innerText = "Nothing To Show Here" 
  }
  else{
    document.querySelector('.js-completed-task-list').innerHTML = html;
  }

  document.querySelectorAll('.js-task-delete-cmpl').
    forEach((link, index) => {
      link.addEventListener('click', () => {
        cmplTaskArray.splice(index, 1);
        saveToCmplStorage();
        renderCompleteTask();
      })
    })
}

renderCompleteTask();