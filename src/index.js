import './styles.css';
import projectCreator from './projects.js';
import taskCreator from './todos.js';

const projects = [];

const exampleProject = projectCreator('Unspecified To-Dos');

const exampleTask1 = taskCreator('Vacuum House', 'carpets on each floor as well as fan blades', '12/9', 'medium');
const exampleTask2 = taskCreator('Mop Floors', 'all uncarpeted areas', '12/9', 'medium');

console.log(projects)
console.log(exampleProject);
console.log(exampleTask1);
console.log(exampleTask2);

exampleProject.addToList(projects);

exampleTask1.addToList(exampleProject.tasks);

exampleTask2.addToList(exampleProject.tasks);

exampleProject.logTasks();
exampleTask1.deleteFromList(exampleProject.tasks);

exampleProject.logTasks();

exampleProject.deleteFromList(projects);

console.log(projects);

/*
const project1 = new Project('Clean House');
const project2 = new Project('Make Dinner');

const todo1 = new ToDoItem('Vaccuum', 'all floors', '12/3', 'medium', false);

const todo2 = new ToDoItem('Prepare meal', 'Rinse and chop all veggies', '12/2', 'high', true);
const todo3 = new ToDoItem('Cook meal', 'Grill on flatiron grill', '12/2', 'high', false);

project1.tasks.push(todo1);

project2.tasks.push(todo2);
project2.tasks.push(todo3);



console.log(project1.title);

project1.displayTasks();


console.log(project2.title);

project2.displayTasks();

project2.tasks[0].toggleComplete()

project2.removeTask(1);

project2.displayTasks();

*/

console.log('\n\n\n\nPage Initialized');