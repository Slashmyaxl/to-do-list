function itemRemover (obj) {

    return {
        deleteFromList: function(array) {
            array.splice(obj, 1);
            console.log(`${obj.title} removed`)
        } 
    };
}

function displayProjectTasks ({tasks}) {
    return {
        logTasks() {
            for (const task of tasks) {

                console.log(` Task: ${task.title}\n Description: ${task.description}\n Due: ${task.dueDate}\n Priority: ${task.priority}\n Completed: ${task.completed}`);
                
            }
        }
    }
}

function itemAdder (obj) {

    return {
        addToList(array){
            array.push(obj);
            
            console.log(`${obj.title} added to ${array}`)
        }
    }
}

export { itemAdder, itemRemover, displayProjectTasks }