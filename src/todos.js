import { removeFromList } from "./functions";

export default function taskCreator(title, description, dueDate, priority, {tasks}) {

    const task = { title: title, description: description, due: dueDate, priority: priority, completed: false, complete, editTask, removeFromList };

    tasks.push(task);
}

function complete() {    

    this.completed === false ? this.completed = true : this.completed = false;
}

function editTask(title, description, due, priority) {

    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;
}