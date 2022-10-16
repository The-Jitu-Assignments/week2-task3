const taskCardContainer = document.querySelector(".task--container");
const title = document.querySelector(".title");
const description = document.querySelector(".title");
const completionDate = document.querySelector(".completion--date");
const submittionDate = document.querySelector(".submittion--date");
const notCompleted = document.querySelector(".not--completed");
const completed = document.querySelector(".completed");


class Tasks {
  async fetchTasks() {
    try {
      let results = await fetch('tasks.json');
      let data = await results.json();
      let tasks = data.tasks;
      return tasks;
    } catch (error) {
      console.log(error);
    }
  }
}

class Interface {
  displayTasks(tasks) {
    let results = '';
    tasks.forEach((task) => {
      results += `
        <div class="task--card" data-id=${task.id}>
          <div class="task--item__header">
            <h3>${task.title}</h3>
            <span class="task--status">${task.completionStatus}</span>
          </div>
          <div class="task--card__description">
            <p class="card--description">
              ${task.description}
            </p>
            <div class="delete--icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </div>
          <div class="task--card__time">
            <div class="task--submittion">
              <span>CompleteStatus:</span>
              <span class="task--status">OnTime</span>
            </div>
            <div class="task--days">
              <span>By:</span>
              <span class="task--status">7 days</span>
            </div>
          </div>
        </div>
      `;
    });
    taskCardContainer.innerHTML = results
  }
};

class Storage {
  static saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  // static getTask(id) {
  //   let tasks =
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new Interface();
  const tasks = new Tasks();

  tasks.fetchTasks().then((tasks) => {
    ui.displayTasks(tasks);
  })
})