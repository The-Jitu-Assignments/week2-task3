const data = [];

class Interface {
  name = 'john'
  displayTasks(products) {

  }
}

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


document.addEventListener('DOMContentLoaded', () => {
  const ui = new Interface();
  const tasks = new Tasks();

  tasks.fetchTasks().then((tasks) => {
    console.log(tasks);
  })
})