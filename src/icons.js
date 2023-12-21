import { createDOMElement } from './functions.js';
import { createEditProjectForm, createAddTaskForm, createEditTaskForm } from './forms.js';
import { displayProjects, clearProjects } from './project-display.js'
import taskCreator from './todos.js';
import { projects } from './projects.js'
import pencilIcon from './icons/pencil-solid.svg';
import addIcon from './icons/plus-solid.svg';

function createEditProjectIcon(projectID) {

    const newEditProjectIcon = createDOMElement('img', projectID, 'icon-project-edit');
    newEditProjectIcon.src = pencilIcon;
    newEditProjectIcon.setAttribute('alt', 'Edit');

    newEditProjectIcon.addEventListener('click', () => {
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
                const projectTitle = document.querySelector('#edit-project-title');
                const projectRemove = document.querySelector('#delete-project');
                const project = projects[newEditProjectForm.id];
        
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
    newAddTaskIcon.src = addIcon;
    newAddTaskIcon.setAttribute('alt', 'Add');

    newAddTaskIcon.addEventListener('click', () => {
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
                const taskName = document.querySelector('#task-name');
                const taskDescription = document.querySelector('#task-description');
                const taskDueDate = document.querySelector('#task-due');
                const taskPriority = document.querySelector('#task-priority');
                const project = projects[newAddTaskForm.id];

                taskCreator(taskName.value, taskDescription.value, taskDueDate.value, taskPriority.value, project);
                console.log(taskDueDate.value);
                clearProjects();
                displayProjects();
            })
        }
    });
    
    return newAddTaskIcon;
}

function createEditTaskIcon (taskID, projectID) {
    
    const newEditTaskIcon = createDOMElement('img', taskID, 'edit-task-icon')
    newEditTaskIcon.src = pencilIcon;
    newEditTaskIcon.setAttribute('alt', 'Edit');

    const projectHead = document.querySelector('.project-header');
    const formHolder = document.querySelector('.form-container');

    (!projectHead.contains(formHolder)) ? newEditTaskIcon.style.opacity = '0.25' :

    newEditTaskIcon.addEventListener('click', () => {
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

    return newEditTaskIcon;
}

export { createAddTaskIcon, createEditTaskIcon, createEditProjectIcon };