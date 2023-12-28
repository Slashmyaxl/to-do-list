import { updateStorage } from "./functions";

const projects = [];

function projectCreator(title) {

    const project = { title: title, tasks: [], editTitle, removeFromList };

    projects.push(project);
    updateStorage();
    console.log(projects);
}

function editTitle (title) {
    this.title = title;
    updateStorage();
}

function removeFromList() {

    projects.splice(projects.indexOf(this), 1);
    updateStorage();
    console.log(`${this.title} removed from Projects Array`)
}

export { projects, projectCreator }