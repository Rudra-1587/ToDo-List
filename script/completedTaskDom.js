import { cmplTaskArray } from "./completedTask.js";
import {formatDate} from "./to-do.js";

function renderCompleteTask() {
  let html = '';
  cmplTaskArray.forEach((task, index) => {
    html += `
      <div class="task-container js-task-container-${index}">
        ${task.taskName}
        ${formatDate(task.dueDate)}
        <button class="js-task-delete-button">Delete</button>
      </div>
    `;
  })
  document.querySelector('.js-completed-task-list').innerHTML = html;
}

renderCompleteTask();