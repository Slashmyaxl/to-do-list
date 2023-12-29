import { projects, projectCreator } from "./projects.js";
import taskCreator from './todos.js';
import { displayProjects, clearProjects } from './project-display.js';
import loadDailyTasks from "./tasks-today.js";
import { formatDate, clearAllCompleted } from './functions.js';

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const projectSubmitter = document.querySelector('#submit-project')
const projectName = document.querySelector('#project-title');
const clearCompleted = document.querySelector('#delete-completed');
const content = document.querySelector('#content');

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

    clearCompleted.addEventListener('click', () => {
        clearAllCompleted();
        if(content.contains(document.getElementById('daily-card'))) {
            clearProjects();
            loadDailyTasks();
        } else {
            clearProjects();
            displayProjects();
        }
    })
}

function checkStorage () {

    const today = formatDate(new Date().toLocaleDateString());

    if(!localStorage.getItem('projects')) {
        projectCreator('Unspecified To-Dos');
            taskCreator('Buy flowers', 'For cousin\'s baby shower', today, 'normal', projects[0]);
            taskCreator('Make breakfast', 'Oatmeal w/ berries & nuts', today, 'high', projects[0]);
        projectCreator('Cat Care');
            taskCreator('Breakfast 6AM', '1/4 cup dry food', today, 'high', projects[1]);
            taskCreator('AM Snack', '6 greenies', today, 'low', projects[1]);
            taskCreator('Brush', '', today, 'normal', projects[1]);
            taskCreator('Dinner 6PM', '1 can purina wet food', today, 'high', projects[1]);
        
    } else {
        const storageArray = JSON.parse(localStorage.getItem('projects'));
        storageArray.forEach((project) => {
            projectCreator(project.title);
            const {tasks} = project;

            tasks.forEach((task) => {
                taskCreator(task.title, task.description, task.due, task.priority, projects[storageArray.indexOf(project)], task.completed)
            })
        });
    }
}