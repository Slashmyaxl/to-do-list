# to-do-list

In this project, I will create a traditional To-Do list with some of the additional functionalities found in more modern applications. These include the ability of the user to group their tasks or "todos" into more broad projects, the sorting of said tasks based on priority levels (low, medium, high), and an interface which allows sorting of tasks due on today's date as opposed to tasks due in the future. Also included with be the functionality to check items off as complete, as well as the ability to edit and remove items and projects.

I will group projects into an array, and each project will be an object with a "title" property as well as a "tasks" property. Within this "tasks" property will be another grouping of "todo" objects into an array. I will separate many of these as classes into seperate modules, and practice with npm and webpack for bundling. I'll start with a skeleton HTML file and attempt to do all DOM manipulation via JavaScript. A separate CSS file will be used for styling.

Finally, I will make a point of considering coding standards and principles in order to make my code more readable and maintainable starting with this project. My goal with the To-Do List is to focus on the SOLID principles I just learned about.


# Pseudocode

* User interface includes a left sidebar with a "Dashboard" header, subheaders for "All Projects," "Due Today," and "Upcoming," and a button to add a new project. A default, or example project which the user may add todos to will be present upon page initialization.

*   User may click (+)add button to create a new "Project." Project is added to a "projects" array.
    1. Each project is an object with a "title" property (string) and a "tasks" property (array)
    2. Each project includes functionality for user to remove it from the "projects" library.
    3. Each project's title may be edited by the user.

*   Within each project, user may click (+)add task button to add a task item, or "todo."
    1. Each todo is an object w/ a "task" property (string), a "description" property (string), a "priority" property (number 1 = high, 2 = medium, 3 = low), a due date property (string - date), and a "completion" (boolean) property.
    2. Each todo will include remove and edit functionalities.
    3. Tasks are arranged based on due date, then priority.
    4. Allow user to check a box which changes/sets "completion" property.