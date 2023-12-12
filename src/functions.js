function removeFromList (list) {

    list.splice(list.indexOf(this), 1);
    console.log(`${this.title} removed from ${list}`)
}

export { removeFromList }