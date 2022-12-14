const taskCardContainer = document.querySelector(".task--container");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
const completionDate = document.querySelector(".completion--date");
const submissionDate = document.querySelector(".submission--date");
const form = document.querySelector(".form");
const errorMessage = document.querySelectorAll(".error--msg");
const completeElement = document.getElementsByName('task_completion');
const taskCheckbox = document.querySelector("#task--checkbox");
const allTasks = document.querySelector('.btn--all');
const completeTasks = document.querySelector('.btn--complete');
const inCompleteTasks = document.querySelector('.btn--incomplete');
const resetBtn = document.querySelector('.reset');

let completionStatus = '';

let tasks = [];
tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let error = [];


const idGenerator = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) // generating a 4-digit password
};

// creating a new task.
const AddTask = () => {
  for (let i = 0; i < completeElement.length; i++) {
    if (completeElement[i].checked) {
      completionStatus = completeElement[i].value;
    }
  }

  // checking if there is any tasks in the localstorage if non tasks will be an empty array.


  tasks.push({
    id: idGenerator(),
    title: title.value,
    description: description.value,
    completionDate: completionDate.value,
    completionStatus: false,
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();
};

// display tasks in the UI.
const displayTasks = () => {
  let fetchedTasks = localStorage.getItem('tasks');
  let tasks = JSON.parse(fetchedTasks);
  handleTaskStatus();
  tasksUI(tasks);
  resetForm();
};


const tasksUI = (data) => {
  let checkedStatus = false;
  let correctDays = true;
  let results = '';

  if (data.length === 0) {
    results = `<div class="task--empty">
      😟 Currently you do not have any task here.
    </div>`
  }
  data.map((task) => {
    let taskStatus = '';
    if (task.completionStatus) {
      checkedStatus = true
    } else {
      checkedStatus = false;
    }
    let difference = new Date(task.submissionDate) - new Date(task.completionDate);
    let diffDays = Math.ceil(Math.abs(difference) / (1000 * 60 * 60 * 24));
    if (difference < 0) {
      taskStatus = 'Submitted on Time';
      correctDays = true;
    } else if (difference === 0) {
      diffDays = 1;
      taskStatus = 'Submitted on Time';
      correctDays = true;
    } else if (difference > 0) {
      taskStatus = 'Submitted Late';
       correctDays = true;
    } else {
      taskStatus = 'Still Pending';
      correctDays = false;
    }
    
    if (data) {
      results += `
          <div class="task--card" id=${task.id}>
            <div class="task--item__header">
            <h3>${task.title}</h3>
            <input type="checkbox" onchange="editStatus(this)" id="task--checkbox" ${checkedStatus ? 'checked' : ''}>
          </div>
            <div class="task--card__description">
              <p></ 
              <p class="card--description">
                ${task.description}
            </p>
            <div class="delete--icon" onclick="editTask(this)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <div class="delete--icon" onclick="deleteTask(this);AddTask">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </div>
          <div class="task--card__time">
            <div class="task--submission">
                <span>SubmissionStatus:</span>
                <span class="task--status">${taskStatus}</span>
              </div>
              ${correctDays ? `
                  <div class="task--days">
                    <span>By:</span>
                  <span class="task--status">${diffDays > 1 ? diffDays + ' days': diffDays + ' day'}</span>
                  </div>
              ` : ''}
            </div>
          </div>
      `;
    } 
  })
  taskCardContainer.innerHTML = results;
}

const handleTaskStatus = () => {
  let completedTasks = tasks.filter((task) => task.completionStatus === true);

  console.log(completedTasks)

  let incompletedTasks = tasks.filter((task) => task.completionStatus === false);
    
    completeTasks.onclick = () => {
      displayTasks()
      tasksUI(completedTasks);
    }

    inCompleteTasks.onclick = () => {
      displayTasks();
      tasksUI(incompletedTasks);
    }

    allTasks.onclick = () => {
      displayTasks();
      tasksUI(tasks);
    }
}

handleTaskStatus();

const editStatus = (e) => {
  let selected = e.parentElement.parentElement;
  let selectedHeader = selected.children[0];
  let inputBox = selectedHeader.children[1];

  tasks = JSON.parse(localStorage.getItem('tasks'));
  const foundTask = tasks.find((task) => task.id === selected.id);

  if (inputBox.checked) {
    tasks = tasks.map((task) => task.id === foundTask.id ? { ...task, completionStatus: true, submissionDate: new Date() } : task);
  } else {
    tasks = tasks.map((task) => task.id === foundTask.id ? { ...task, completionStatus: false, submissionDate: '' } : task);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  // tasksUI(tasks)

  displayTasks();
}

// update task details
const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  tasks = JSON.parse(localStorage.getItem('tasks'));
  const currentTask = tasks.find((task) => task.id === selectedTask.id);

  console.log(currentTask);
  let  { 
    title: currentTaskTitle, 
    description: currentTaskDescription, 
    completionDate: currentTaskCompletionDate,
  } = currentTask;

  title.value = currentTaskTitle;
  description.value = currentTaskDescription;
  completionDate.value = currentTaskCompletionDate;

  deleteTask(e);
}

// delete a task both from the UI and the local storage.
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  tasks = tasks.filter((task) => task.id !== e.parentElement.parentElement.id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  handleTaskStatus();
};


const resetForm = () => {
  title.value = "";
  description.value = "";
  completionDate.value = "";
}

const formValidation = () => {
  error = [...errorMessage];
  if (title.value === '') {
    error[0].innerHTML =  '* Title should not be empty';
  } else{
    error[0].innerHTML = '';
  }

  if (description.value === '') {
    error[1].innerHTML = '* Description should not be empty';
  } else{
    error[1].innerHTML = '';
  }

  if (completionDate.value === '') {
    error[2].innerHTML = '* Completion Date should not empty';
  } else{
    error[2].innerHTML = '';
  }
  
  if (description.value !== '' && title.value !== '' && completionDate.value !== '') {
    AddTask();
  }
}

resetBtn.onclick = () => {
  error = [...errorMessage];
  for (let i = 0; i < error.length; i++) {
    error[i].innerHTML = '';
  }
}

// validate form details before submission.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

// this is to display current tasks in the UI on page load.
window.onload = function() {
  displayTasks();
}
