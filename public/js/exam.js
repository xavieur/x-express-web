for (let form of document.forms) {
    form.addEventListener('click', (e) => {
        const id = e.target.parentNode.id
        const value = parseInt(e.target.value)
        if (id && value) {
            const guesses = readGuesses()
            if (guesses.findIndex((guess) => {
                return guess.id === id
            }) === -1) {
                guesses.push({ id, value })
                writeGuesses(guesses)
            }
        }
    })
}

const consultRightAnswers = async () => {
    let tests = await axios.get('https://x-express-web.herokuapp.com/api/tests')

    const answers = tests.data.map((test) => {
        return { id: test._id, value: test.solution }
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

const checkAnswers = async () => {
    const guesses = await readGuesses()
    const answers = await readAnswers()
    let rights = 0
    let wrongs = 0
    guesses.forEach((guess) => {
        const answer = answers.find((answer) => {
            return answer.id === guess.id
        })
        if (answer.value === guess.value) {
            document.getElementById(guess.id).classList.add('right-answer')
            rights++
        } else {
            document.getElementById(guess.id).classList.add('wrong-answer')
            /* document.querySelector(`#${guess.id} span:nth-child(${guess.value})`).classList.add('wrong-answer') */
            wrongs++
        }
    })
    return { rightAnswersNumber: rights, wrongAnswersNumber: wrongs, total: answers.length }
}

window.addEventListener('unload', (e) => {
    localStorage.clear()
    for(let form of document.forms){
        form.reset()
    }
})

const showAnswersButton = document.querySelector('#verify')
const resetButton = document.querySelector('#reset')
const answersModal = document.querySelector('#answersModal')
const closeAnswersModal = document.querySelector('#answersModal span.close')

const rightAnswers = document.querySelector('#rightAnswers')
const wrongAnswers = document.querySelector('#wrongAnswers')
const score = document.querySelector('#score')

resetButton.addEventListener('click', (e) => {
    localStorage.clear()
    for(let form of document.forms){
        console.log('reset button -> form', form)
        form.classList.remove('right-answer', 'wrong-answer')
        form.reset()
    }
})

showAnswersButton.addEventListener('click', async (e) => {
    e.preventDefault()

    const { rightAnswersNumber, wrongAnswersNumber, total } = await checkAnswers()
    const scoreNumber = (rightAnswersNumber ? (rightAnswersNumber - wrongAnswersNumber * .33) * 10 / total : 0).toFixed(2)

    rightAnswers.textContent = rightAnswersNumber
    wrongAnswers.textContent = wrongAnswersNumber
    score.textContent = scoreNumber

    answersModal.classList.add('show')
})

window.addEventListener('click', (e) => {
    if (e.target === answersModal) {
        answersModal.classList.remove('show')
    }
})

closeAnswersModal.addEventListener('click', (e) => {
    answersModal.classList.remove('show')
})