import { removeFromList } from "./functions";
import { format } from 'date-fns';

export default function taskCreator(title, description, dueDate, priority, {tasks}) {

    if(!dueDate) {
        dueDate = format(new Date(), 'MM-dd-yyyy'); 
    } else {
        dueDate = format(dueDate, 'MM-dd-yyyy');
    }
    
    const task = { title: title, description: description, due: dueDate, priority: priority, completed: false, complete, editTask, removeFromList };

    tasks.push(task);
}

function complete() {    

    this.completed === false ? this.completed = true : this.completed = false;
}

function editTask(title, description, dueDate, priority) {

    if(!dueDate) {
        dueDate = format(new Date(), 'MM-dd-yyyy'); 
    } else {
        dueDate = format(dueDate, 'MM-dd-yyyy');
    }

    this.title = title;
    this.description = description;
    this.due = dueDate;
    this.priority = priority;
}