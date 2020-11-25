const postRequest = document.querySelector('#post')
const readRequests = document.querySelector('#readAll')
const readRequest = document.querySelector('#read')
const updateRequest = document.querySelector('#update')
const deleteRequest = document.querySelector('#delete')

const testData = {
    question: '¿quién ha llamado?',
    answer1: 'Juan',
    answer2: 'Jesús',
    answer3: 'Marina',
    answer4: 'Viera'
}

postRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.post('https://x-express-web.herokuapp.com/api/tests', testData)
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
