import { removeFromList } from "./functions";

function taskCreator(title, description, dueDate, priority, {tasks}) {

    const task = { title: title, description: description, due: dueDate, priority: priority, completed: 'Pending', complete, changePriority, removeFromList };

    tasks.push(task);
}


function complete() {    

    this.completed === 'Pending' ? this.completed = 'Completed' : this.completed = 'Pending'
}

function changePriority(priority) {

    this.priority = priority;
}

export { taskCreator }