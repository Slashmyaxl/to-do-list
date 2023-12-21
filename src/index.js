import './styles.css';
import { projects, projectCreator } from './projects.js';
import taskCreator from './todos.js';
import loadFrontPage from './frontpage.js';
import { format } from 'date-fns';

projectCreator('Unspecified To-Dos');

taskCreator('Vacuum House', 'carpets on each floor as well as fan blades', format(new Date(2023, 11, 20), "MM-dd-yyyy"), 'normal', projects[0]);
taskCreator('Make Breakfast', 'Just Egg', format(new Date(2023, 11, 22), "MM-dd-yyyy"), 'high', projects[0]);
taskCreator('Laundry', 'with towels', format(new Date(), "MM-dd-yyyy"), 'low', projects[0]);

loadFrontPage();

console.log('\n\n\nPage Initialized');
