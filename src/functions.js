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

function createForm (className, idValue, ...inputs) {
    const newForm = document.createElement('form');
    if(className) newForm.classList.add(className);
    if(idValue) newForm.setAttribute('id', idValue);

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

    console.log(date);
    //Re-format hyphenated dates as "date-fns" format() alone subtracts 1 day
    const dateString = date.replace(/-/g, '/');
    const formattedDate = format(dateString, 'MM-dd-yyyy');
    return formattedDate;
}

function updateStorage () {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export { createDOMElement, createForm, formatDate, updateStorage }