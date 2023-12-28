import { projects } from './projects.js';
import displayTaskToDOM from './task-display.js';
import { displayProjects, clearProjects } from './project-display.js';
import { createDOMElement } from './functions.js';
import { format } from 'date-fns';

const content = document.querySelector('#content');
const projectsIcon = document.querySelector('#projects');


export default function loadDailyTasks () {

    const projectCard = createDOMElement('div', '', 'project-card', 'task-card');
    const projectHeader = createDOMElement('div', '', 'project-header');

    const projectTitle = createDOMElement('h2');
    projectTitle.textContent = 'Today\'s To-Dos';
    projectHeader.appendChild(projectTitle);
    projectCard.appendChild(projectHeader);
    content.appendChild(projectCard);

    for (const project of projects) {

        const {tasks} = project;

        for (const task of tasks) {

            const dateToday = format(new Date(), 'MM-dd-yyyy');
            const dateDue = format(task.due, 'MM-dd-yyyy');
            
            if (dateToday === dateDue) {
                const taskContainer = displayTaskToDOM(task, project);
                projectCard.appendChild(taskContainer);
            }
        }  
    }
    activateProjectsNav();
}

function activateProjectsNav () {
    projectsIcon.addEventListener('click', () => {
        clearProjects();
        displayProjects();
    })
}