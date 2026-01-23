import {toDoArray, formatDate} from "./to-do.js";

function renderCompleteTask() {
  let html = '';
  toDoArray.filter(task => task.done)
    .forEach((task, index) => {
      html += `
        <div class="task-container js-task-container-${index}">
          ${task.taskName}
          ${formatDate(task.dueDate)}
          <button class="js-task-delete-button">Delete</button>
        </div>
      `;

      document.querySelector('.js-task-list').innerHTML = html;
    })
}

renderCompleteTask()