import { removeFromList } from "./functions";

const projects = [];

function projectCreator(title) {

    const project = { title: title, tasks: [], displayTasks, removeFromList }

    projects.push(project);
}

function displayTasks () {
    
    for (const task of this.tasks) {

        console.log(` Task: ${task.title}\n Description: ${task.description}\n Due: ${task.due}\n Priority: ${task.priority}\n Completed: ${task.completed}\n\n`);   
    }     
}

export { projects, projectCreator }