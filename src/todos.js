import { removeFromList } from "./functions";

function taskCreator(title, description, dueDate, priority, {tasks}) {

    const task = { title: title, description: description, due: dueDate, priority: priority, completed: 'Pending Completion', complete, editTask, removeFromList };

    tasks.push(task);
}


function complete() {    

    this.completed === 'Pending Completion' ? this.completed = 'Completed' : this.completed = 'Pending Completion'
}

function editTask(title, description, due, priority) {

    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;
}

export { taskCreator }