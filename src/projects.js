import { removeFromList, updateStorage } from "./functions";

const projects = [];

function projectCreator(title) {

    const project = { title: title, tasks: [], editTitle, removeFromList };

    projects.push(project);
    updateStorage();
}

function editTitle (title) {
    this.title = title;
    updateStorage();
}

export { projects, projectCreator }