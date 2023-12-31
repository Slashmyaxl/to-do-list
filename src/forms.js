import { createForm, createDOMElement } from './functions.js';
import { projects } from './projects.js';
import { format } from 'date-fns';

function createEditProjectForm (projectID) {
    const newEditForm = createForm('Edit Project', 'edit-project', projectID, 'edit-project-title', 'delete-project');

    //  Form-specific DOM attributes for editing Projects

    const titleLabel = newEditForm.firstElementChild.nextElementSibling;
    titleLabel.textContent = 'Title ';
    
    const titleInput = newEditForm.querySelector('#edit-project-title');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'edit-project-title');
    titleInput.setAttribute('value', `${projects[projectID].title}`);

    const deleteRow = createDOMElement('div', 'delete-row', 'form-row');
    const deleteLabel = titleInput.nextElementSibling;
    deleteLabel.textContent = 'Remove Project';
    
    
    const deleteInput = newEditForm.querySelector('#delete-project');
    deleteInput.setAttribute('type', 'checkbox');
    deleteInput.setAttribute('name', 'delete-project');
    deleteRow.appendChild(deleteInput);
    deleteRow.appendChild(deleteLabel);
    newEditForm.appendChild(deleteRow);

    const confirmProjectEdit = createDOMElement('button', 'edit-project-button', 'confirm');
    confirmProjectEdit.textContent = 'Confirm';
    newEditForm.appendChild(confirmProjectEdit);

    return newEditForm;
}

function createAddTaskForm (projectID) {
    const newAddForm = createForm('Add To-Do', 'add-task', projectID, 'task-name', 'task-description', 'task-due');

    //  Form-specific DOM attributes for adding Tasks

    const nameLabel = newAddForm.firstChild.nextElementSibling;
    nameLabel.textContent = 'Task ';

    const nameInput = newAddForm.querySelector('#task-name');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'task-name');
    nameInput.setAttribute('placeholder', 'Your to-do Task');

    const descLabel = nameInput.nextElementSibling;
    descLabel.textContent = 'Description ';

    const descInput = newAddForm.querySelector('#task-description');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('name', 'task-description');
    descInput.setAttribute('placeholder', '(optional)');

    const dueLabel = descInput.nextElementSibling;
    dueLabel.textContent = 'Due ';
    
    const dueInput = newAddForm.querySelector('#task-due');
    const today = format(new Date(), 'yyyy-MM-dd');
    dueInput.setAttribute('type', 'date');
    dueInput.setAttribute('name', 'task-due-date');
    dueInput.setAttribute('value', `${today}`);

    const priorityLabel = createDOMElement('label');
    priorityLabel.setAttribute('for', 'task-priority');
    priorityLabel.textContent = 'Priority ';

    const priorityInput = createDOMElement('select', 'task-priority');
    priorityInput.setAttribute('name', 'task-priority');

    const option1 = createDOMElement('option');
    option1.setAttribute('value', 'high');
    option1.textContent = 'High';
    priorityInput.appendChild(option1);

    const option2 = createDOMElement('option');
    option2.setAttribute('value', 'normal');
    option2.textContent = 'Normal';
    option2.setAttribute('selected', true);
    priorityInput.appendChild(option2);

    const option3 = createDOMElement('option');
    option3.setAttribute('value', 'low');
    option3.textContent = 'Low'
    priorityInput.appendChild(option3);

    const confirmTaskAdd = createDOMElement('button', 'add-task-button', 'confirm');
    confirmTaskAdd.textContent = 'Add Task';

    newAddForm.appendChild(priorityLabel);
    newAddForm.appendChild(priorityInput);
    newAddForm.appendChild(confirmTaskAdd);

    return newAddForm;
}

function createEditTaskForm (projectID, taskID) {
    const newEditForm = createForm('Edit/Delete Task', 'edit-task', taskID, 'edit-task-name', 'edit-task-description', 'edit-task-due', 'delete-task');
    const task = projects[projectID].tasks[taskID];

    //  Form-specific DOM attributes for editing/deleting Tasks

    const nameLabel = newEditForm.firstElementChild.nextElementSibling;
    nameLabel.textContent = 'Task ';

    const nameInput = newEditForm.querySelector('#edit-task-name');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'edit-task-name');
    nameInput.setAttribute('value', task.title);

    const descLabel = nameInput.nextElementSibling;
    descLabel.textContent = 'Description ';

    const descInput = newEditForm.querySelector('#edit-task-description');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('name', 'task-description');
    descInput.setAttribute('value', task.description);

    const dueLabel = descInput.nextElementSibling;
    dueLabel.textContent = 'Due ';
    
    const dueInput = newEditForm.querySelector('#edit-task-due');
    dueInput.setAttribute('type', 'date');
    dueInput.setAttribute('name', 'task-due-date');
    dueInput.setAttribute('value', format(task.due, 'yyyy-MM-dd'));

    const priorityLabel = createDOMElement('label');
    priorityLabel.setAttribute('for', 'edit-task-priority');
    priorityLabel.textContent = 'Priority '

    const priorityInput = createDOMElement('select', 'edit-task-priority');
    priorityInput.setAttribute('name', 'edit-task-priority');

    const option1 = createDOMElement('option');
    option1.setAttribute('value', 'high');
    task.priority === 'high' ? option1.setAttribute('selected', true) : task.priority;
    option1.textContent = 'High';
    priorityInput.appendChild(option1);

    const option2 = createDOMElement('option');
    option2.setAttribute('value', 'normal');
    task.priority === 'normal' ? option2.setAttribute('selected', true) : task.priority;
    option2.textContent = 'Normal';
    priorityInput.appendChild(option2);

    const option3 = createDOMElement('option');
    option3.setAttribute('value', 'low');
    task.priority === 'low' ? option3.setAttribute('selected', true) : task.priority;
    option3.textContent = 'Low'
    priorityInput.appendChild(option3);

    const deleteRow = createDOMElement('div', 'delete-row', 'form-row')
    const deleteLabel = dueInput.nextElementSibling;
    deleteLabel.textContent = 'Remove Task';
    
    
    const deleteInput = newEditForm.querySelector('#delete-task');
    deleteInput.setAttribute('type', 'checkbox');
    deleteInput.setAttribute('name', 'delete-task')
    deleteRow.appendChild(deleteInput);
    deleteRow.appendChild(deleteLabel);
    newEditForm.append(deleteRow);

    const confirmTaskEdit = createDOMElement('button', 'edit-task-button', 'confirm');
    confirmTaskEdit.textContent = 'Edit Task';

    newEditForm.insertBefore(priorityLabel, deleteRow);
    newEditForm.insertBefore(priorityInput, deleteRow);
    newEditForm.appendChild(confirmTaskEdit);

    return newEditForm;
}

export { createEditProjectForm, createAddTaskForm, createEditTaskForm }