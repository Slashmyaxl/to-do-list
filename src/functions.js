function removeFromList (list) {

    list.splice(list.indexOf(this), 1);
    console.log(`${this.title} removed`)
}

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

function sortByDueDate ({due}) {

}


export { removeFromList, createDOMElement, createForm }