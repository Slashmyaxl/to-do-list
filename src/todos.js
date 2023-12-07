import { itemRemover, itemAdder } from "./functions";

export default function taskCreator(title, description, dueDate, priority) {

    const task = { title: title, description: description, due: dueDate, priority: priority, completed: 'Pending' };

    return {
        ...task,
        ...itemAdder(task),
        ...itemRemover(task),
    }
}

/*
export default class ToDoItem {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate,
        this.priority = priority,
        this.completed = 'Pending'
    }

    toggleComplete() {
        this.completed === 'Pending' ? this.completed = 'Completed' : this.completed = 'Pending';
    };
}
*/