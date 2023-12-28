import { formatDate, updateStorage } from "./functions";

export default function taskCreator(title, description, dueDate, priority, {tasks}, completed) {

    if(!dueDate) {
        dueDate = formatDate(new Date().toLocaleDateString()); 
    } else {
        dueDate = formatDate(dueDate);
    }

    const task = { 
        title: title, 
        description: description, 
        due: dueDate, priority: 
        priority, 
        completed: completed === true ? true : false,
        complete, 
        editTask, 
        removeFromList };

    tasks.push(task);
    updateStorage();
}

function complete() {    

    this.completed === false ? this.completed = true : this.completed = false;
    updateStorage();
}

function editTask(title, description, dueDate, priority) {

    if(!dueDate) {
        dueDate = formatDate(new Date().toLocaleDateString); 
    } else {
        dueDate = formatDate(dueDate);
    }

    this.title = title;
    this.description = description;
    this.due = dueDate;
    this.priority = priority;
    updateStorage();
}

function removeFromList (tasks) {

    tasks.splice(tasks.indexOf(this), 1);
    updateStorage();
    console.log(`${this.title} removed from its project`)
}