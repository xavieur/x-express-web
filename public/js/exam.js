for (let form of document.forms) {
    console.log(form)
    form.addEventListener('click', (e) => {
        const id = e.target.parentNode.id
        const value = parseInt(e.target.value)
        console.log(id) // el id de la pregunta
        console.log(value) // el value de cada respuesta
        if (id && value) {
            const guesses = readGuesses()
            console.log('guesses before push ', guesses)
            guesses.push({ id, value })
            console.log('guesses after push ', guesses)
            writeGuesses(guesses)
        }
    })
}

const consultRightAnswers = async () => {
    console.log('hola q tal?')
    let answers = await axios.get('https://x-express-web.herokuapp.com/api/tests')
    console.log(answers.data)

    answers = answers.data.map((test)=>{
        return {id:test._id, value:test.value}
    })
    writeAnswers(answers)
}

consultRightAnswers()

const readGuesses = () => {
    const guesses = localStorage.getItem('guesses')
    try {
        return guesses ? JSON.parse(guesses) : []
    } catch (e) {
        return []
    }
}

const writeGuesses = (guesses) => {
    localStorage.setItem('guesses', JSON.stringify(guesses))
}


const readAnswers = () => {
    const answers = localStorage.getItem('answers')
    try {
        return answers ? JSON.parse(answers) : []
    } catch (e) {
        return []
    }
}
const writeAnswers = (answers) => {
    localStorage.setItem('answers', JSON.stringify(answers))
}

console.log(readGuesses())

const checkAnswers = () => {
    const guesses = readGuesses()
    const answers = readAnswers()


}

window.addEventListener('unload', (e)=>{
    localStorage.clear()
})