import { projects } from "./projects";
import taskCreator from './todos.js';
import { createDOMElement } from "./functions.js";
import { createEditProjectForm, createAddTaskForm, createEditTaskForm } from './forms.js'

const content = document.querySelector('#content');
const sidebarProjects = document.querySelector('#projects-sidebar');

export default function addProjectToDOM(project) {

    const projectID = `${projects.indexOf(project)}`

    const projectCard = createDOMElement('div', projectID, 'project-card');
    const projectHeader = createDOMElement('div', '', 'project-header');

    const projectTitle = createDOMElement('h2');
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    const formContainer = createDOMElement('div', '', 'form-container');
    projectHeader.appendChild(formContainer);

    const projectIcons = createDOMElement('div', '', 'project-icons');
    projectHeader.appendChild(projectIcons);

    //  Button(icon) which populates and removes form for editing and deleting projects

    const editProjectIcon = createEditProjectIcon(projectID);
    projectIcons.appendChild(editProjectIcon);

    //  Button(icon) which populates and removes form for adding tasks to projects

    const addTaskIcon = createAddTaskIcon(projectID);
    projectIcons.appendChild(addTaskIcon);

    projectCard.appendChild(projectHeader);

        for (const task of project.tasks) {

            const taskID = project.tasks.indexOf(task);

            const taskContainer = createDOMElement('div', '', 'task-container');
            const taskHeader = createDOMElement('div', '', 'task-header');
            const taskBodyContainer = createDOMElement('div', '', 'task-body-container');
                taskBodyContainer.setAttribute('hidden', true);
            const taskBody = createDOMElement('div', '', 'task-body');

            const taskTitle = createDOMElement('p');
            taskTitle.textContent = task.title;
            taskHeader.appendChild(taskTitle);

            const dueDate = createDOMElement('p');
            dueDate.textContent = `Due ${task.due}`;
            taskHeader.appendChild(dueDate);

            const expandIcon = createDOMElement('img', '', 'icon-expand');
            expandIcon.addEventListener('click', () => {
                taskBodyContainer.toggleAttribute('hidden');
            })
            taskHeader.appendChild(expandIcon);

            taskContainer.appendChild(taskHeader);

            const taskIcons = createDOMElement('div', '', 'task-icons-container');

            const editTaskIcon = createNewEditTaskIcon(projectID, taskID);
            taskIcons.appendChild(editTaskIcon);

            const completeTaskIcon = createDOMElement('img', `${project.tasks.indexOf(task)}`, 'task-icon')
            completeTaskIcon.classList.add('task-icon-complete');
            completeTaskIcon.setAttribute('alt', 'Complete')
            completeTaskIcon.addEventListener('click', (e) => {
                project.tasks[e.target.id].complete();
                clearProjects();
                displayProjects();
            });
            taskIcons.appendChild(completeTaskIcon);

            const taskInfo = createDOMElement('div', '', 'task-info')
            
            const description = createDOMElement('p');
            description.textContent = task.description;
            taskInfo.appendChild(description);

            const priority = createDOMElement('p');
            priority.textContent = `${task.priority} priority`;
            taskInfo.appendChild(priority);

            const completed = createDOMElement('p');
            completed.textContent = task.completed;
            taskInfo.appendChild(completed);

            taskBody.appendChild(taskInfo);
            taskBody.appendChild(taskIcons);
            taskBodyContainer.appendChild(taskBody);
            taskContainer.appendChild(taskBodyContainer);
            projectCard.appendChild(taskContainer);
        }

    content.appendChild(projectCard);

    const sidebarProject = createDOMElement('h3', '', 'sidebar-project')
    sidebarProject.textContent = project.title;
    sidebarProjects.appendChild(sidebarProject);
}

function createEditProjectIcon(projectID) {
    const newEditProjectIcon = createDOMElement('img', projectID, 'icon-project-edit');
    newEditProjectIcon.setAttribute('alt', 'Edit');
    newEditProjectIcon.addEventListener('click', () => {
        const newEditProjectForm = createEditProjectForm(projectID);
        const formContainer = document.querySelector('.form-container');
        if(formContainer.hasChildNodes()) {
            formContainer.removeChild(formContainer.lastChild);
        } else {
            formContainer.appendChild(newEditProjectForm);
            
            //  Button that submits changes for project editing

            const confirmProjectEdit = document.querySelector('#edit-project-button');
            confirmProjectEdit.addEventListener('click', (e) => {
                e.preventDefault();
                const editProjectForm = document.querySelector('.edit-project');
                const projectTitle = document.querySelector('#edit-project-title');
                const projectRemove = document.querySelector('#delete-project');
                const project = projects[editProjectForm.id];
        
                project.editTitle(projectTitle.value);
                if (projectRemove.checked) project.removeFromList(projects);
                formContainer.removeChild(formContainer.lastChild);
                clearProjects();
                displayProjects();
            })
        }
    });

    return newEditProjectIcon;
}

function createAddTaskIcon(projectID) {
    const newAddTaskIcon = createDOMElement('img', projectID, 'icon-task-add');
    newAddTaskIcon.setAttribute('alt', 'Add');
    newAddTaskIcon.addEventListener('click', () => {
        const newAddTaskForm = createAddTaskForm(projectID);
        const formContainer = document.querySelector('.form-container');
        if(formContainer.hasChildNodes()) {
            formContainer.removeChild(formContainer.lastChild);
        } else {
            formContainer.appendChild(newAddTaskForm);

            //  Button that adds task to project

            const confirmProjectAdd = document.querySelector('#add-task-button');
            confirmProjectAdd.addEventListener('click', (e) => {
                e.preventDefault();
                const addTaskForm = document.querySelector('.add-task');
                const taskName = document.querySelector('#task-name');
                const taskDescription = document.querySelector('#task-description');
                const taskDueDate = document.querySelector('#task-due');
                const taskPriority = document.querySelector('#task-priority');
                const project = projects[addTaskForm.id];

                taskCreator(taskName.value, taskDescription.value, taskDueDate.value, taskPriority.value, project);
                clearProjects();
                displayProjects();
            })
        }
    });

    return newAddTaskIcon;
}

function createNewEditTaskIcon (projectID, taskID) {
    const newEditTaskIcon = createDOMElement('img', taskID, 'edit-task-icon')
    newEditTaskIcon.classList.add('task-icon-edit');
    newEditTaskIcon.setAttribute('alt', 'Edit')
    newEditTaskIcon.addEventListener('click', () => {
        const newEditTaskForm = createEditTaskForm(projectID, taskID);
        const formContainer = document.querySelector('.form-container');
        if(formContainer.hasChildNodes()) {
            formContainer.removeChild(formContainer.lastChild);
        } else {
            formContainer.appendChild(newEditTaskForm);

            const confirmEditTask = document.querySelector('#edit-task-button');
            confirmEditTask.addEventListener('click', (e) => {
                e.preventDefault();
                const taskName = document.querySelector('#edit-task-name');
                const taskDescription = document.querySelector('#edit-task-description');
                const taskDueDate = document.querySelector('#edit-task-due');
                const taskPriority = document.querySelector('#edit-task-priority');
                const deleteTask = document.querySelector('#delete-task');
                const project = projects[projectID];
                const task = projects[projectID].tasks[taskID];

                task.editTask(taskName.value, taskDescription.value, taskDueDate.value, taskPriority.value);
                if (deleteTask.checked) task.removeFromList(project.tasks);
                formContainer.removeChild(formContainer.lastChild);
                clearProjects();
                displayProjects();
            })
        }
    });

    return newEditTaskIcon;
}

function displayProjects() {

    for (const project of projects) {
        addProjectToDOM(project);
    }
}

function clearProjects() {

    while (content.firstChild) content.removeChild(content.lastChild)
    while (sidebarProjects.firstChild) sidebarProjects.removeChild(sidebarProjects.lastChild) 
}