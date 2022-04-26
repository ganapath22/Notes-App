const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    console.log('Your notes...')
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse("Your notes:"))
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const displayNote = notes.find((note) => note.title === title)

    if (displayNote) {
        console.log(chalk.white.inverse(displayNote.title))
        console.log(displayNote.body)
    }else{
        console.log(chalk.red.inverse("No such note found"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const modifiedNotes = notes.filter((note) => !(title === note.title))
    saveNotes(modifiedNotes)

    if (modifiedNotes.length != notes.length){
    console.log(chalk.green.inverse(title + ' is removed.'))
    } else{
        console.log(chalk.red.inverse(title + ' not found in notes.'))
    }

}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote){

    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
} else {
    console.log(chalk.red.inverse('Note title taken!'))
}
    


}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }
    catch(e){
        return []

    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}