import { projects, projectCreator } from "./projects.js";
import taskCreator from './todos.js';
import { displayProjects, clearProjects } from './project-display.js';
import loadDailyTasks from "./tasks-today.js";
import { formatDate } from './functions.js';

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const projectSubmitter = document.querySelector('#submit-project')
const projectName = document.querySelector('#project-title');

const displayDailies = document.querySelector('#daily-tasks');

export default function loadFrontPage () {
    checkStorage();
    displayProjects();
    defaultListeners();
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

    displayDailies.addEventListener('click', () => {
        clearProjects();
        loadDailyTasks();
    })
}

function checkStorage () {
    if(!localStorage.getItem('projects')) {
        projectCreator('Unspecified To-Dos');
        taskCreator('Buy flowers', 'For cousin\'s baby shower', formatDate('2023-12-30'), 'normal', projects[0]);
        taskCreator('Make Breakfast', 'Oatmeal w/ berries & nuts', formatDate('2023-12-28'), 'high', projects[0]);
        console.log("Projects not found!")
        console.log(projects);
    } else {
        const storageArray = JSON.parse(localStorage.getItem('projects'));
        storageArray.forEach((project) => {
            projectCreator(project.title);
            const {tasks} = project;
            console.log(tasks);
            tasks.forEach((task) => {
                taskCreator(task.title, task.description, task.due, task.priority, projects[storageArray.indexOf(project)], task.completed)
            })
        });
        console.log(projects);
        console.log("Projects found!");
    }
}