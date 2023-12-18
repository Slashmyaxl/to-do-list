import { createDOMElement } from './functions.js';
import { createEditProjectForm, createEditTaskForm, createAddTaskForm } from './forms.js';
import pencilIcon from './icons/pencil-solid.svg';
import addIcon from './icons/plus-solid.svg';

function createEditProjectIcon(projectID) {
    const newEditProjectIcon = createDOMElement('img', projectID, 'icon-project-edit');
    newEditProjectIcon.src = pencilIcon;
    newEditProjectIcon.setAttribute('alt', 'Edit');
    
    return newEditProjectIcon;
}

function createAddTaskIcon(projectID) {
    const newAddTaskIcon = createDOMElement('img', projectID, 'icon-task-add');
    newAddTaskIcon.src = addIcon;
    newAddTaskIcon.setAttribute('alt', 'Add');
    
    return newAddTaskIcon;
}

function createEditTaskIcon (taskID) {
    const newEditTaskIcon = createDOMElement('img', taskID, 'edit-task-icon')
    newEditTaskIcon.src = pencilIcon;
    newEditTaskIcon.classList.add('task-icon-edit');
    newEditTaskIcon.setAttribute('alt', 'Edit')

    return newEditTaskIcon;
}

export { createAddTaskIcon, createEditTaskIcon, createEditProjectIcon };