import { projects } from "./projects";
import taskCreator from './todos.js';
import { createDOMElement } from "./functions.js";
import { createEditProjectForm, createAddTaskForm, createEditTaskForm } from './forms.js'
import expandIcon from './icons/chevron-down-solid.svg';
import expandedIcon from './icons/angles-down-solid.svg';
import { createAddTaskIcon, createEditTaskIcon, createEditProjectIcon } from "./icons.js";

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
    editProjectIcon.addEventListener('click', () => {
        const newEditProjectForm = createEditProjectForm(projectID);
        const formContainer = document.querySelector(`#form-container-${projectID}`);
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
    projectIcons.appendChild(editProjectIcon);

    //  Button(icon) which populates and removes form for adding tasks to projects

    const addTaskIcon = createAddTaskIcon(projectID);
    addTaskIcon.addEventListener('click', () => {
        const newAddTaskForm = createAddTaskForm(projectID);
        const formContainer = document.querySelector(`#form-container-${projectID}`);
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

    projectIcons.appendChild(addTaskIcon);

    projectCard.appendChild(projectHeader);

        for (const task of project.tasks) {

            const taskContainer = displayTaskToDOM(project, task);
            projectCard.appendChild(taskContainer);
        }

    content.appendChild(projectCard);

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

function displayTaskToDOM(project, task) {
    const projectID = projects.indexOf(project);
    const taskID = projects[projectID].tasks.indexOf(task);
    
    const taskContainer = createDOMElement('div', '', 'task-container');
    const taskHeader = createDOMElement('div', '', 'task-header');
    const taskBodyContainer = createDOMElement('div', '', 'task-body-container');
        taskBodyContainer.setAttribute('hidden', true);

    taskHeader.addEventListener('click', () => {
        taskBodyContainer.toggleAttribute('hidden');
        if(expandTaskIcon.src !== expandedIcon) {
            expandTaskIcon.src = expandedIcon;
        } else expandTaskIcon.src = expandIcon;
    })
    
    const taskBody = createDOMElement('div', '', 'task-body');

    const taskTitle = createDOMElement('p');
    taskTitle.textContent = task.title;
    taskHeader.appendChild(taskTitle);

    const dueDate = createDOMElement('p');
    dueDate.textContent = `Due ${task.due}`;
    taskHeader.appendChild(dueDate);

    const expandTaskIcon = createDOMElement('img', '', 'icon-expand');
    expandTaskIcon.src = expandIcon;
    taskHeader.appendChild(expandTaskIcon);

    taskContainer.appendChild(taskHeader);

    const taskIcons = createDOMElement('div', '', 'task-icons-container');

    const editTaskIcon = createEditTaskIcon(taskID);

    editTaskIcon.addEventListener('click', () => {
        const newEditTaskForm = createEditTaskForm(projectID, taskID);
        const formContainer = document.querySelector(`#form-container-${projectID}`);

        if(formContainer.hasChildNodes()) {
            formContainer.removeChild(formContainer.lastChild);
        } else {
            formContainer.appendChild(newEditTaskForm);

            //  Button that submits task editing/deleting

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
    taskIcons.appendChild(editTaskIcon);

    const completionBox = createDOMElement('input', `${taskID}`, 'checkbox-complete');
    completionBox.setAttribute('type', 'checkbox')
    completionBox.addEventListener('click', () => {
        task.complete();
        if(task.completed === true) {
            completed.textContent = 'Complete';
            taskContainer.style.background = 'lightgreen';
            taskContainer.style.opacity = '0.55';
        } else {
            completed.textContent = 'Pending Completion';
            taskContainer.style.background = '#fefefe';
            taskContainer.style.opacity = 'unset';
        }
        console.log(task);
    });
    taskIcons.appendChild(completionBox);

    const taskInfo = createDOMElement('div', '', 'task-info')
    
    const description = createDOMElement('p');
    description.textContent = task.description;
    taskInfo.appendChild(description);

    const priority = createDOMElement('p', '', 'task-priority');
    priority.textContent = `PRIORITY`;
    if (task.priority === 'high') {
        priority.style.cssText = 'background: rgba(252, 42, 4, 0.7);';
        taskContainer.style.cssText = 'box-shadow: inset 1px 1px 2px rgb(252, 42, 4), inset -1px -1px 2px rgb(252, 42, 4);';
    } else if (task.priority === 'normal') {
        priority.style.cssText = 'background: rgba(250, 240, 94, 0.7);';
        taskContainer.style.cssText = 'box-shadow: inset 1px 1px 2px rgb(250, 240, 94), inset -1px -1px 2px rgb(250,240,94);';
    } else {
        priority.style.cssText = 'background: rgba(160, 252, 2, 0.8)';
    }

    taskInfo.appendChild(priority);

    const completed = createDOMElement('p', '', 'completion-status');
    if(task.completed === true) {
        completed.textContent = 'Complete';
        completionBox.setAttribute('checked', true);
        taskContainer.style.background = 'lightgreen';
        taskContainer.style.opacity = '0.55';
    } else {
        completed.textContent = 'Pending Completion';
        taskContainer.style.background = '#fefefe';
        taskContainer.style.opacity = 'unset';
    }
    taskInfo.appendChild(completed);

    taskBody.appendChild(taskInfo);
    taskBody.appendChild(taskIcons);
    taskBodyContainer.appendChild(taskBody);
    taskContainer.appendChild(taskBodyContainer);

    return taskContainer;
}

export { displayProjects, clearProjects, displayTaskToDOM }