import { projects, projectCreator } from "./projects";
import { taskCreator } from "./todos";

const content = document.querySelector('#content');
const sidebar = document.querySelector('#projects-sidebar');

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const projectSubmitter = document.querySelector('#submit-project');
const projectName = document.querySelector('#project-title');

const taskName = document.querySelector('#task-name');
const taskDescription = document.querySelector('#task-description');
const taskDue = document.querySelector('#task-due');
const taskPriority = document.querySelector('#task-priority');

const taskSubmitter = document.querySelector('#submit-task');
const taskForm = document.querySelector('.task-form');



function displayProjects() {

    for (const project of projects) {
        addProjectToDOM(project);
    }
}

function clearProjects() {

    while (content.firstChild) content.removeChild(content.lastChild)
    while (sidebar.firstChild) sidebar.removeChild(sidebar.lastChild) 
}

function defaultListeners() {

    projectAdder.addEventListener('click', () => {
        projectForm.toggleAttribute('hidden');
    })
    
    projectSubmitter.addEventListener('click', (e) => {
        e.preventDefault();
        projectCreator(projectName.value);
        projectForm.toggleAttribute('hidden');
        clearProjects();
        displayProjects();
    })

    taskSubmitter.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(taskForm.id);
        taskCreator(taskName.value, taskDescription.value, taskDue.value, taskPriority.value, projects[taskForm.id]);
        taskForm.toggleAttribute('hidden');
        clearProjects();
        displayProjects();
    })
}

function addProjectToDOM(project) {

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.setAttribute('id', projects.indexOf(project));

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    const projectIcons = document.createElement('div');
    projectIcons.classList.add('project-icons');
    projectHeader.appendChild(projectIcons);

    const editProjectIcon = document.createElement('img');
    editProjectIcon.classList.add('icon-project-edit');
    editProjectIcon.setAttribute('alt', 'Edit');
    editProjectIcon.setAttribute('id', projects.indexOf(project));
    projectIcons.appendChild(editProjectIcon);

    const addTaskIcon = document.createElement('img');
    addTaskIcon.classList.add('icon-task-add');
    addTaskIcon.setAttribute('alt', 'Add');
    addTaskIcon.setAttribute('id', projects.indexOf(project));
    addTaskIcon.addEventListener('click', (e) => {
        taskForm.toggleAttribute('hidden');
        taskForm.setAttribute('id', e.target.id);
    })
    projectIcons.appendChild(addTaskIcon);

    projectCard.appendChild(projectHeader);

        for (const todo of project.tasks) {

            const projectTasks = document.createElement('div');
            projectTasks.classList.add('project-tasks');

            const task = document.createElement('p');
            task.classList.add('task');
            task.textContent = `Task: ${todo.title}`;
            projectTasks.appendChild(task);

            const description = document.createElement('p');
            description.classList.add('description');
            description.textContent = `Description: ${todo.description}`;
            projectTasks.appendChild(description);

            const due = document.createElement('p');
            due.classList.add('due-date');
            due.textContent = `Due: ${todo.due}`;
            projectTasks.appendChild(due);

            const priority = document.createElement('p');
            priority.classList.add('priority');
            priority.textContent = `${todo.priority} priority`;
            projectTasks.appendChild(priority);

            const completed = document.createElement('p');
            completed.classList.add('completed');
            completed.textContent = todo.completed;
            projectTasks.appendChild(completed);

            projectCard.appendChild(projectTasks);
        }

    content.appendChild(projectCard);

    const sideHeader = document.createElement('h3');
    sideHeader.classList.add('side-header');
    sideHeader.textContent = project.title;
    sidebar.appendChild(sideHeader);
}

export { displayProjects, defaultListeners }