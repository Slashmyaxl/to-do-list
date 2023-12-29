import { format } from 'date-fns';
import { projects } from './projects';

function createDOMElement (elementName, idValue, ...classNames) {

    const newElement = document.createElement(elementName);
    if(idValue) newElement.setAttribute('id', idValue);
    if(classNames) {
        for (const value of classNames) {
            newElement.classList.add(value);
        }
    }
    
    return newElement;
}

function createForm (header, className, idValue, ...inputs) {
    const newForm = document.createElement('form');
    if(className) newForm.classList.add(className);
    if(idValue) newForm.setAttribute('id', idValue);

    const formTitle = createDOMElement('div', '', 'form-title');
    const formHeader = createDOMElement('h4');
    formHeader.textContent = header;
    formTitle.appendChild(formHeader);
    newForm.appendChild(formTitle);

    for (const value of inputs) {
        const label = createDOMElement('label');
        label.setAttribute('for', `${value}`);

        const input = createDOMElement('input', `${value}`);
        input.setAttribute('name', `${value}`);

        newForm.appendChild(label);
        newForm.appendChild(input);
    }

    return newForm;
}

function formatDate (date) {

    //Re-format hyphenated dates as "date-fns" format() alone subtracts 1 day
    const dateString = date.replace(/-/g, '/');
    const formattedDate = format(dateString, 'MM-dd-yyyy');
    return formattedDate;
}

function removeFromList (list) {

    list.splice(list.indexOf(this), 1);
    updateStorage();
}

function updateStorage () {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function clearAllCompleted() {

    for (const project of projects) {
        const {tasks} = project;
        project.tasks = tasks.filter(task => task.completed === false);
    }
    updateStorage();
}

export { createDOMElement, createForm, formatDate, removeFromList, updateStorage, clearAllCompleted }