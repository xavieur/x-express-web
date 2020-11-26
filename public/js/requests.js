// const postRequest = document.querySelector('#post')
const readRequests = document.querySelector('#readAll')
const readRequest = document.querySelector('#read')
const updateRequest = document.querySelector('#update')
const deleteRequest = document.querySelector('#delete')
const question = document.querySelector('#question')
const answer1 = document.querySelector('#answer1')
const answer2 = document.querySelector('#answer2')
const answer3 = document.querySelector('#answer3')
const answer4 = document.querySelector('#answer4')
const form = document.querySelector('#test-form')

/* postRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.post('https://x-express-web.herokuapp.com/api/tests', testData)
}) */

form.addEventListener('submit', async (e) => {
    console.log(e.target)
    e.preventDefault()
    const resultado = await axios.post('https://x-express-web.herokuapp.com/api/tests', {
        question: e.target.elements.question.value,
        answer1: e.target.elements.answer1.value,
        answer2: e.target.elements.answer2.value,
        answer3: e.target.elements.answer3.value,
        answer4: e.target.elements.answer4.value
    })
    console.log(resultado)
})

readRequests.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.get('https://x-express-web.herokuapp.com/api/tests/')
    console.log(resultado)
})

readRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.get('https://x-express-web.herokuapp.com/api/tests/5fb63caff287430989eddb04')
    console.log(resultado)

})

updateRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.patch('https://x-express-web.herokuapp.com/api/tests/5fbe43e8ed1d1800174795f5', {question:'¿A quién tengo que llamar cuando acabe la clase?'})
    console.log(resultado)

})

deleteRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.delete('https://x-express-web.herokuapp.com/api/tests/5fb63caff287430989eddb04')
    console.log(resultado)
})
