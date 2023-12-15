import addProjectToDOM from "./project-display";
import { projects, projectCreator } from "./projects.js";

const content = document.querySelector('#content');
const sidebar = document.querySelector('#projects-sidebar');
const projectCards = document.querySelectorAll('.project-card')

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const projectSubmitter = document.querySelector('#submit-project')

const projectName = document.querySelector('#project-title');

const editTaskForm = document.querySelector('.edit-task-form');
const editTaskSubmitter = document.querySelector('#edit-task');

const editTaskTitle = document.querySelector('#edit-task-name');
const editTaskDescription = document.querySelector('#edit-task-description');
const editTaskDue = document.querySelector('#edit-task-due');
const editTaskPriority = document.querySelector('#edit-task-priority');
const taskRemove = document.querySelector('#delete-task');

function displayProjects() {

    for (const project of projects) {
        addProjectToDOM(project);
    }
}

function clearProjects() {

    while (content.firstChild) content.removeChild(content.lastChild)
    while (sidebar.firstChild) sidebar.removeChild(sidebar.lastChild) 
}

function defaultListeners() {

    projectAdder.addEventListener('click', () => {
        projectForm.toggleAttribute('hidden');
    })
    
    projectSubmitter.addEventListener('click', (e) => {
        e.preventDefault();
        projectCreator(projectName.value);
        projectForm.toggleAttribute('hidden');
        clearProjects();
        displayProjects();
    })
/*
    editTaskSubmitter.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(projects);
        console.log(editTaskForm.id);
        const task = projects[projectCards.target.id].tasks[editTaskForm.id];

        console.log(task);

        task.editTask(editTaskTitle.value, editTaskDescription.value, editTaskDue.value, editTaskPriority.value);
        if(taskRemove.checked) task.removeFromList(projects[editTaskForm.id].tasks);
        editTaskForm.toggleAttribute('hidden');
        clearProjects();
        displayProjects();
    })
    */
}

export { displayProjects, defaultListeners }