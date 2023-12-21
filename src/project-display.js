import { projects } from "./projects";
import { createDOMElement } from "./functions.js";
import { createAddTaskIcon, createEditProjectIcon } from "./icons.js";
import displayTaskToDOM from "./task-display.js";

const content = document.querySelector('#content');
const sidebarProjects = document.querySelector('#projects-sidebar');

function addProjectToDOM(project) {

    const projectID = `${projects.indexOf(project)}`

    const projectCard = createDOMElement('div', projectID, 'project-card');
    const projectHeader = createDOMElement('div', '', 'project-header');

    const formContainer = createDOMElement('div', `form-container-${projectID}`, 'form-container');
    projectHeader.appendChild(formContainer);

    const projectTitle = createDOMElement('h2');
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    const projectIcons = createDOMElement('div', '', 'project-icons');
    projectHeader.appendChild(projectIcons);

    //  Button(icon) which populates and removes form for editing and deleting projects

    const editProjectIcon = createEditProjectIcon(projectID);
    projectIcons.appendChild(editProjectIcon);

    //  Button(icon) which populates and removes form for adding tasks to projects
    
    const addTaskIcon = createAddTaskIcon(projectID);
    projectIcons.appendChild(addTaskIcon);

    projectCard.appendChild(projectHeader);

    content.appendChild(projectCard);

    const {tasks} = project;

        for (const task of tasks) {

            const taskContainer = displayTaskToDOM(task, project);
            projectCard.appendChild(taskContainer);
        }

    const sidebarProject = createDOMElement('h3', '', 'sidebar-project')
    sidebarProject.textContent = project.title;
    sidebarProjects.appendChild(sidebarProject);
}

function displayProjects() {

    for (const project of projects) {
        addProjectToDOM(project);
    }

    console.log(projects);
}

function clearProjects() {

    while (content.firstChild) content.removeChild(content.lastChild)
    while (sidebarProjects.firstChild) sidebarProjects.removeChild(sidebarProjects.lastChild) 
}



export { displayProjects, clearProjects }