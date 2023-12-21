import { projects } from './projects.js';
import { createDOMElement } from './functions.js';
import { createEditTaskIcon } from './icons.js';
import expandIcon from './icons/chevron-down-solid.svg';
import expandedIcon from './icons/angles-down-solid.svg';

export default function displayTaskToDOM(task, project) {
    const projectID = projects.indexOf(project);
    const taskID = projects[projectID].tasks.indexOf(task);
    
    const taskContainer = createDOMElement('div', '', 'task-container');
    const taskHeader = createDOMElement('div', '', 'task-header');
    const taskBodyContainer = createDOMElement('div', '', 'task-body-container');
        taskBodyContainer.setAttribute('hidden', true);

    taskHeader.addEventListener('click', () => {
        taskBodyContainer.toggleAttribute('hidden');
        (expandTaskIcon.src !== expandedIcon) ? expandTaskIcon.src = expandedIcon : expandTaskIcon.src = expandIcon
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

    const editTaskIcon = createEditTaskIcon(taskID, projectID);
    taskIcons.appendChild(editTaskIcon);

    const completionBox = createDOMElement('input', '', 'checkbox-complete');
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