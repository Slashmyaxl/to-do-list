import { removeFromList } from "./functions";

const projects = [];

function projectCreator(title) {

    const project = { title: title, tasks: [], editTitle, removeFromList }

    projects.push(project);
}

function editTitle (title) {
    this.title = title;
}

export { projects, projectCreator }