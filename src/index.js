import './styles.css';
import { projects, projectCreator } from './projects.js';
import { taskCreator } from './todos.js';
import { displayProjects, defaultListeners } from './frontpage.js';

projectCreator('Unspecified To-Dos');

taskCreator('Vacuum House', 'carpets on each floor as well as fan blades', `12\/9`, 'medium', projects[0]);


console.log(projects);

displayProjects();
defaultListeners();


console.log('\n\n\nPage Initialized');
