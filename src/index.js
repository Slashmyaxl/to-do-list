import './styles.css';
import { projects, projectCreator } from './projects.js';
import taskCreator from './todos.js';
import loadFrontPage from './frontpage.js';

projectCreator('Unspecified To-Dos');

taskCreator('Vacuum House', 'carpets on each floor as well as fan blades', `12\/9`, 'normal', projects[0]);

loadFrontPage();

console.log('\n\n\nPage Initialized');
