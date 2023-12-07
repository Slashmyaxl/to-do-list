import { itemRemover, itemAdder, displayProjectTasks } from "./functions";


export default function projectCreator(title) {
    const project = { title: title, tasks: [] }

    return {
        ...project,
        ...itemRemover(project),
        ...itemAdder(project),
        ...displayProjectTasks(project)
    }
}


/*
export default class Project {
    constructor (title) {
        this.title = title,
        this.tasks = []
    };

    removeTask(index) {
        this.tasks.splice(index, 1);
    };

    displayTasks() {
        for (const task of this.tasks) {

        console.log(` Task: ${task.title}\n Description: ${task.description}\n Due: ${task.dueDate}\n Priority: ${task.priority}\n Completed: ${task.completed}`);
        
        }
    };
}
*/