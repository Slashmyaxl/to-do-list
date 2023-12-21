import { projectCreator } from "./projects.js";
import { displayProjects, clearProjects } from './project-display.js';
import loadDailyTasks from "./tasks-today.js";

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const projectSubmitter = document.querySelector('#submit-project')
const projectName = document.querySelector('#project-title');

const displayDailies = document.querySelector('#daily-tasks');

export default function loadFrontPage () {
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