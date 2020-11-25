const postRequest = document.querySelector('#post')
const readRequests = document.querySelector('#readAll')
const readRequest = document.querySelector('#read')
const updateRequest = document.querySelector('#update')
const deleteRequest = document.querySelector('#delete')

const testPrueba = {
    question: '¿quién ha llamado?',
    answer1: 'Juan',
    answer2: 'Jesús',
    answer3: 'Marina',
    answer4: 'Viera'
}

postRequest.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.post('https://x-express-web.herokuapp.com/api/tests', { data: testPrueba })
})

readRequests.addEventListener('click', async (e) => {
    e.preventDefault()
    const resultado = await axios.get('https://x-express-web.herokuapp.com/api/tests/')
    console.log(resultado)
})

readRequest.addEventListener('click', (e) => {
    e.preventDefault()
    const resultado = await axios.get('https://x-express-web.herokuapp.com/api/tests/5fb63caff287430989eddb04')
    console.log(resultado)

})

updateRequest.addEventListener('click', (e) => {
    e.preventDefault()
    const resultado = await axios.patch('https://x-express-web.herokuapp.com/api/tests/5fb63caff287430989eddb04', {data: {question:'¿Cómo se traduce al castellano en nombre del módulo que gestiona la base de datos?'}})
    console.log(resultado)

})

deleteRequest.addEventListener('click', (e) => {
    e.preventDefault()
    const resultado = await axios.delete('https://x-express-web.herokuapp.com/api/tests/5fb63caff287430989eddb04')
    console.log(resultado)
})
