import { projects } from "./projects";

const content = document.querySelector('#content');
const sidebar = document.querySelector('#projects-sidebar');

const projectAdder = document.querySelector('#add-project');
const projectForm = document.querySelector('#project-form');
const editProjectForm = document.querySelector('#project-edit-form');
const editProjectSubmitter = document.querySelector('#edit-project');
const projectSubmitter = document.querySelector('#submit-project');
const projectName = document.querySelector('#project-title');
const projectRemove = document.querySelector('#delete-project');

const taskSubmitter = document.querySelector('#submit-task');
const taskForm = document.querySelector('.task-form');
const taskName = document.querySelector('#task-name');
const taskDescription = document.querySelector('#task-description');
const taskDue = document.querySelector('#task-due');
const taskPriority = document.querySelector('#task-priority');
const editTaskForm = document.querySelector('.edit-task-form');
const editTaskSubmitter = document.querySelector('#edit-task');

const projectTitle = document.querySelector('#edit-project-title');
const editTaskTitle = document.querySelector('#edit-task-name');
const editTaskDescription = document.querySelector('#edit-task-description');
const editTaskDue = document.querySelector('#edit-task-due');
const editTaskPriority = document.querySelector('#edit-task-priority');

export default function addProjectToDOM(project) {

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
    editProjectIcon.addEventListener('click', (e) => {
        editProjectForm.toggleAttribute('hidden');
        editProjectForm.setAttribute('id', e.target.id);
    })
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

            const taskContainer = document.createElement('div');
            taskContainer.classList.add('project-tasks');

            const taskHeader = document.createElement('div');
            taskHeader.classList.add('task-header');

            const taskBody = document.createElement('div');
            taskBody.classList.add('task-body');
            taskBody.setAttribute('hidden', true);

            const taskTitle = document.createElement('p');
            taskTitle.textContent = todo.title;
            taskHeader.appendChild(taskTitle);

            const due = document.createElement('p');
            due.textContent = `Due ${todo.due}`;
            taskHeader.appendChild(due);

            const expandIcon = document.createElement('img');
            expandIcon.classList.add('icon-expand');
            expandIcon.addEventListener('click', () => {
                taskBody.toggleAttribute('hidden');
            })
            taskHeader.appendChild(expandIcon);
            taskContainer.appendChild(taskHeader);

            const taskIcons = document.createElement('div');
            taskIcons.classList.add('task-icons-container');

            const editTaskIcon = document.createElement('img');
            editTaskIcon.classList.add('task-icon');
            editTaskIcon.classList.add('task-icon-edit');
            editTaskIcon.setAttribute('alt', 'Edit')
            editTaskIcon.setAttribute('id', project.tasks.indexOf(todo));
            editTaskIcon.addEventListener('click', (e) => {
                editTaskForm.toggleAttribute('hidden');
                editTaskForm.setAttribute('id', e.target.id);
            });
            taskIcons.appendChild(editTaskIcon);

            const completeTaskIcon = document.createElement('img');
            completeTaskIcon.classList.add('task-icon');
            completeTaskIcon.classList.add('task-icon-complete');
            completeTaskIcon.setAttribute('alt', 'Complete')
            completeTaskIcon.setAttribute('id', project.tasks.indexOf(todo));
            completeTaskIcon.addEventListener('click', (e) => {
                project.tasks[e.target.id].complete();
                clearProjects();
                displayProjects();
            });

            taskIcons.appendChild(completeTaskIcon);

            taskBody.appendChild(taskIcons);

            const taskBodyItems = document.createElement('div');
            taskBodyItems.classList.add('task-body-items');
            
            const description = document.createElement('p');
            description.textContent = todo.description;
            taskBodyItems.appendChild(description);

            const priority = document.createElement('p');
            priority.textContent = `${todo.priority} priority`;
            taskBodyItems.appendChild(priority);

            const completed = document.createElement('p');
            completed.textContent = todo.completed;
            taskBodyItems.appendChild(completed);

            taskBody.appendChild(taskBodyItems);

           
            taskContainer.appendChild(taskBody);
            projectCard.appendChild(taskContainer);
        }

    content.appendChild(projectCard);

    const sideHeader = document.createElement('h3');
    sideHeader.classList.add('side-header');
    sideHeader.textContent = project.title;
    sidebar.appendChild(sideHeader);
}

function displayProjects() {

    for (const project of projects) {
        addProjectToDOM(project);
    }
}

function clearProjects() {

    while (content.firstChild) content.removeChild(content.lastChild)
    while (sidebar.firstChild) sidebar.removeChild(sidebar.lastChild) 
}